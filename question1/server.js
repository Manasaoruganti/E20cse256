const http = require("http");

const app = require("./app");

const PORT = 8008;

const server = http.createServer(app);

async function startServer() {
	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer();
