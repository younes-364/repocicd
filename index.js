const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello from Kubernetes via Jenkins CI/CD 🚀");
});

server.listen(3000, () => {
    console.log("App running on port 3000");
});
