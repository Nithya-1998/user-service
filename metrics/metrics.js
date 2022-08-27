const express = require('express');
const client = require('prom-client');
const log = require('./logger');
const http = require('http')
const url = require('url');

const register = new client.Registry()

register.setDefaultLabels({
    app: 'userservice-nodejs-app'
  })


const app = express();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
})

register.registerMetric(httpRequestDurationMicroseconds)


const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
});

const databaseResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
}); 

register.registerMetric(restResponseTimeHistogram)
register.registerMetric(databaseResponseTimeHistogram)

client.collectDefaultMetrics({ register })

const startMetricsServer = () => {

    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();

    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", client.register.contentType);

        return res.send(await client.register.metrics());
    });

    app.listen(8002, () => {
        log.info("User Service - Metrics server started at http://localhost:8002");
    });
}


module.exports = startMetricsServer;