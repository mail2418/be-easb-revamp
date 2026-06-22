# Observability (Grafana LGTM)

Self-hosted **LGTM** stack (Loki, Grafana, Tempo, Metrics/Prometheus) for the EASB backend on the VPS.

## Components

| Service | Container | Port | Purpose |
|---------|-----------|------|---------|
| Prometheus | `easb-prometheus` | 9090 (internal) | Scrapes backend `/metrics` and cAdvisor |
| Loki | `easb-loki` | 3100 (internal) | Log storage |
| Promtail | `easb-promtail` | — | Ships Docker container logs → Loki |
| Tempo | `easb-tempo` | 3200 / 4318 (internal) | Trace storage; OTLP HTTP receiver |
| cAdvisor | `easb-cadvisor` | 8080 (internal) | Container CPU, memory, disk, network IO |
| Grafana | `easb-grafana` | 3006 (host) | Dashboards, Explore, alerts |

## Backend instrumentation

| Path | Description |
|------|-------------|
| `GET /health` | Liveness probe |
| `GET /health/ready` | Readiness probe (includes DB ping) |
| `GET /metrics` | Prometheus metrics (default Node/process + HTTP RED) |

These paths are **outside** the `/api/dev/v1` prefix.

### HTTP RED metrics

Custom `prom-client` metrics (route templates, not raw URLs):

- `http_server_requests_total{method,route,status}`
- `http_server_request_duration_seconds{method,route,status}`

### Traces

OpenTelemetry SDK exports traces via OTLP HTTP to Tempo. Configure in `.env`:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://tempo:4318
OTEL_SERVICE_NAME=easb-backend
OTEL_TRACES_SAMPLER_ARG=0.1   # 10% in production; use 1.0 in dev
# OTEL_ENABLED=false          # disable traces entirely
```

### Logs

Pino JSON logs to stdout include `trace_id`, `span_id`, and `correlationId`. Promtail tails Docker logs and pushes to Loki with `trace_id` / `correlationId` labels for correlation in Grafana.

## Start on VPS

```bash
cd /path/to/be-samarta-easb-tulungagung

docker compose -f docker-compose.yml -f docker-compose.prod.yml \
  --env-file .env.production \
  --profile mysql --profile backend --profile nginx --profile observability up -d
```

Set Grafana credentials in `.env.production`:

```env
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=your-secure-password
```

Open Grafana at `http://<vps-ip>:3006` (restrict via firewall or nginx basic auth in production).

## Security notes

- Do not expose `/metrics`, Loki, Tempo, or Prometheus publicly; they stay on `easb-net`.
- Promtail requires read access to `/var/run/docker.sock` on the VPS.
- Restrict Grafana port 3006 to VPN or nginx with authentication.
- Change default Grafana admin password immediately.

## Dashboards & alerts

Provisioned automatically from `observability/grafana/`:

- **EASB API Monitoring** — CPU, memory, IO, request/error rate, latency by route, traces, logs
- **Grafana alert rules** — Backend Down, High Error Rate (>5% 5xx), High Latency P95 (>2s)

Contact points (email/Slack) can be added later in Grafana UI.

## Post-deploy verification

```bash
# Health & metrics
curl -f http://localhost:3000/health
curl -f http://localhost:3000/health/ready
curl -s http://localhost:3000/metrics | grep http_server_requests_total

# Generate traffic, then in Grafana Explore:
# - Tempo: { resource.service.name = "easb-backend" }
# - Loki:  {container="easb-backend"} | json | trace_id != ""
```

## Local development

Run the observability profile alongside the backend to test the full stack:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml \
  --profile postgres --profile backend --profile observability up -d --build
```

Set `OTEL_TRACES_SAMPLER_ARG=1.0` in `.env` for full trace sampling locally.
