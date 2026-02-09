const http = require('http');
const { Client } = require('pg');

// Configure DB connection from env vars
const client = new Client({
    host: process.env.DB_HOST || 'postgres.dev.svc.cluster.local',
    user: process.env.DB_USER || 'myappuser',
    database: process.env.DB_NAME || 'myappdb',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Try connecting to Postgres
client.connect()
    .then(() => {
        console.log("✅ Connected to Postgres successfully!");
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log("DB Time:", res.rows[0].now);
    })
    .catch(err => {
        console.error("❌ DB connection failed:", err.stack);
    });

const server = http.createServer((req, res) => {
    res.end("Hello from Kubernetes via Jenkins CI/CD 🚀");
});

server.listen(3000, () => {
    console.log("App running on port 3000");
});