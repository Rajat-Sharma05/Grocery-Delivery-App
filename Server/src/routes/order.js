import fastify from "fastify";
import {
    confirmOrder,
    createOrder,
    getOrderById,
    getOrders,
    updateOrderStatus,
} from "../controllers/order/order.js";
import { verifyToken } from "../middleware/auth.js";

export const orderRoutes = async (fastify, options ) => {
    fastify.addHook("preHandler", async (fastify, options)=> {
        const isAuthenticated = await verifyToken(requestAnimationFrame, reply);
        if(!isAuthenticated){
            return reply.code(401).send({ message: "Unauthorized" });
        }
    });

    fastify.post("/order", createOrder);
    fastify.get("/order", getOrders);
    fastify.patch("/order/:orderId/status", updateOrderStatus);
    fastify.post("/order/:orderId/confirm", confirmOrder);
    fastify.get("/order/:orderId", getOrderById);
};