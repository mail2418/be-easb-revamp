import { Request, Response, NextFunction } from 'express';
import { Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
    name: 'http_server_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'] as const,
});

const httpRequestDuration = new Histogram({
    name: 'http_server_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'] as const,
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

function getRouteTemplate(req: Request): string {
    if (req.route?.path) {
        const base = req.baseUrl || '';
        return `${base}${req.route.path}`;
    }
    return 'unknown';
}

export function MetricsMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = process.hrtime.bigint();

        res.on('finish', () => {
            const route = getRouteTemplate(req);
            const method = req.method;
            const status = String(res.statusCode);
            const labels = { method, route, status };

            httpRequestsTotal.inc(labels);

            const durationNs = process.hrtime.bigint() - start;
            httpRequestDuration.observe(labels, Number(durationNs) / 1e9);
        });

        next();
    };
}
