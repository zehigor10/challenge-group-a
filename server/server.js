import fastify from "fastify";
import routes from "./src/routes/index.js";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});

app.register(routes, {prefix: "/api"});

app.listen({
    port: 4444,
    host: "0.0.0.0",
}).then(() => {
    console.log('HTTP Server running');
})