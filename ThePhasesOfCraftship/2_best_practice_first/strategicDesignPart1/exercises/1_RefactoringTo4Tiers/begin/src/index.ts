import { Server } from "./bootstrap";

const port = Number(process.env.PORT || 3000);

const server = new Server();

server.start(port);