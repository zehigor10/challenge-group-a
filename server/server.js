import fastify from "fastify";
import routes from "./src/routes/index.js";

const app = fastify();

app.register(routes, { prefix: "/api" });

app.listen({
    port: 4444,
    host: "0.0.0.0",
}).then(() => {
    console.log('HTTP Server running');
})