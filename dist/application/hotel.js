"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHotel = exports.deleteHotel = exports.createHotel = exports.generateResponse = exports.getHotelById = exports.getAllHotels = void 0;
var Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var hotel_1 = require("../domain/dtos/hotel");
var openai_1 = __importDefault(require("openai"));
var stripe_1 = __importDefault(require("../infrastructure/stripe"));
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var getAllHotels = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotels_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Hotel_1.default.find()];
            case 1:
                hotels_1 = _a.sent();
                res.status(200).json(hotels_1);
                return [2 /*return*/];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllHotels = getAllHotels;
var getHotelById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, hotel, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotelId = req.params.id;
                return [4 /*yield*/, Hotel_1.default.findById(hotelId)];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                res.status(200).json(hotel);
                return [2 /*return*/];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHotelById = getHotelById;
var generateResponse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, openai, completion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = req.body.prompt;
                openai = new openai_1.default({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                return [4 /*yield*/, openai.chat.completions.create({
                        model: "gpt-4o",
                        messages: [
                            // {
                            //   role: "system",
                            //   content:
                            //     "You are assistant that will categorize the words that a user gives and give them labels and show an output. Return this response as in the following examples: user: Lake, Cat, Dog, Tree; response: [{label:Nature, words:['Lake', 'Tree']}, {label:Animals, words:['Cat', 'Dog']}] ",
                            // },
                            { role: "user", content: prompt },
                        ],
                        store: true,
                    })];
            case 1:
                completion = _a.sent();
                res.status(200).json({
                    message: {
                        role: "assistant",
                        content: completion.choices[0].message.content,
                    },
                });
                return [2 /*return*/];
        }
    });
}); };
exports.generateResponse = generateResponse;
var createHotel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, hotelData, stripeProduct, hotel, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                validationResult = hotel_1.CreateHotelDTO.safeParse(req.body);
                if (!validationResult.success) {
                    res.status(400).json({
                        message: "Invalid hotel data",
                        errors: validationResult.error.format(),
                    });
                    return [2 /*return*/];
                }
                hotelData = validationResult.data;
                return [4 /*yield*/, stripe_1.default.products.create({
                        name: hotelData.name,
                        description: hotelData.description,
                        default_price_data: {
                            unit_amount: Math.round(parseFloat(hotelData.price) * 100), // Convert to cents
                            currency: "usd",
                        },
                    })];
            case 1:
                stripeProduct = _a.sent();
                hotel = new Hotel_1.default({
                    name: hotelData.name,
                    location: hotelData.location,
                    image: hotelData.image,
                    price: hotelData.price,
                    description: hotelData.description,
                    stripePriceId: stripeProduct.default_price,
                });
                return [4 /*yield*/, hotel.save()];
            case 2:
                _a.sent();
                res.status(201).json(hotel);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error creating hotel:", error_3);
                res.status(500).json({
                    message: "Failed to create hotel",
                    error: error_3 instanceof Error ? error_3.message : String(error_3),
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createHotel = createHotel;
var deleteHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotelId = req.params.id;
                return [4 /*yield*/, Hotel_1.default.findByIdAndDelete(hotelId)];
            case 1:
                _a.sent();
                // Return the response
                res.status(200).send();
                return [2 /*return*/];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteHotel = deleteHotel;
var updateHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, updatedHotel, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotelId = req.params.hotelId;
                updatedHotel = req.body;
                // Validate the request data
                if (!updatedHotel.name ||
                    !updatedHotel.location ||
                    !updatedHotel.rating ||
                    !updatedHotel.reviews ||
                    !updatedHotel.image ||
                    !updatedHotel.price ||
                    !updatedHotel.description) {
                    throw new validation_error_1.default("Invalid hotel data");
                }
                return [4 /*yield*/, Hotel_1.default.findByIdAndUpdate(hotelId, updatedHotel)];
            case 1:
                _a.sent();
                // Return the response
                res.status(200).send();
                return [2 /*return*/];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateHotel = updateHotel;
//# sourceMappingURL=hotel.js.map