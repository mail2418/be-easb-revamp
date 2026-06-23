import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { ParentBasedSampler, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-base';

export function startOtel(): void {
    if (process.env.OTEL_ENABLED === 'false') {
        return;
    }

    const endpoint = (process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://tempo:4318').replace(
        /\/$/,
        '',
    );
    const serviceName = process.env.OTEL_SERVICE_NAME || 'easb-backend';
    const defaultRatio = process.env.NODE_ENV === 'production' ? '0.1' : '1.0';
    const ratio = Number.parseFloat(process.env.OTEL_TRACES_SAMPLER_ARG || defaultRatio);

    const sdk = new NodeSDK({
        resource: resourceFromAttributes({
            [ATTR_SERVICE_NAME]: serviceName,
        }),
        traceExporter: new OTLPTraceExporter({
            url: `${endpoint}/v1/traces`,
        }),
        sampler: new ParentBasedSampler({
            root: new TraceIdRatioBasedSampler(Number.isFinite(ratio) ? ratio : 0.1),
        }),
        instrumentations: [
            getNodeAutoInstrumentations({
                '@opentelemetry/instrumentation-fs': { enabled: false },
            }),
        ],
    });

    sdk.start();

    process.on('SIGTERM', () => {
        sdk.shutdown().catch(() => undefined);
    });
}
