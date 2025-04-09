"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var hotel_1 = require("./../application/hotel");
var authentication_middleware_1 = require("./middlewares/authentication-middleware");
var authorization_middleware_1 = require("./middlewares/authorization-middleware");
var embedding_1 = require("../application/embedding");
var retrieve_1 = require("../application/retrieve");
var hotelsRouter = express_1.default.Router();
hotelsRouter.route("/").get(hotel_1.getAllHotels).post(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, hotel_1.createHotel);
hotelsRouter
    .route("/:id")
    .get(hotel_1.getHotelById)
    .put(hotel_1.updateHotel)
    .delete(hotel_1.deleteHotel);
hotelsRouter.route("/embeddings/create").post(embedding_1.createEmbeddings);
hotelsRouter.route("/search/retrieve").get(retrieve_1.retrieve);
exports.default = hotelsRouter;
//# sourceMappingURL=hotel.js.map