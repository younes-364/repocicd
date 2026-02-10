const http = require('http');
const { Client } = require('pg');
const client = require('prom-client');


// Configure DB connection from env vars
const client = new Client({
    host: process.env.DB_HOST || 'postgres.dev.svc.cluster.local',
    user: process.env.DB_USER || 'myappuser',
    database: process.env.DB_NAME || 'myappdb',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom counter
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
});

// Connect once at startup
client.connect()
    .then(() => console.log("✅ Connected to Postgres successfully!!!!"))
    .catch(err => console.error(" DB connection failed:", err.stack));

const server = http.createServer(async (req, res) => {
    try {
        const result = await client.query('SELECT NOW()');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello from Kubernetes via Jenkins CI/CD \nDB connection OK\nDB Time: ${result.rows[0].now}`);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Hello from Kubernetes via Jenkins CI/CD \n DB connection failed:\n${err.message}`);
    }
});

server.listen(3000, () => {
    console.log("App running on port 4000");
});