"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./infrastructure/db"));
var express_2 = require("@clerk/express");
var cors_1 = __importDefault(require("cors"));
var booking_1 = __importDefault(require("./api/booking"));
var hotel_1 = __importDefault(require("./api/hotel"));
var global_error_handling_middleware_1 = __importDefault(require("./api/middlewares/global-error-handling-middleware"));
var payment_1 = require("./application/payment");
var body_parser_1 = __importDefault(require("body-parser"));
var payment_2 = __importDefault(require("./api/payment"));
// Create an Express instance
var app = (0, express_1.default)();
app.use((0, express_2.clerkMiddleware)());
// Middleware to parse JSON data in the request body
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
app.post("/api/stripe/webhook", body_parser_1.default.raw({ type: "application/json" }), payment_1.handleWebhook);
app.use(express_1.default.json());
app.use("/api/hotels", hotel_1.default);
app.use("/api/bookings", booking_1.default);
app.use("/api/payments", payment_2.default);
app.use(global_error_handling_middleware_1.default);
// Define the port to run the server
(0, db_1.default)();
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
//# sourceMappingURL=index.js.map