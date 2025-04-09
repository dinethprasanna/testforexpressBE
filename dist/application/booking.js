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
exports.getBookingById = exports.getAllBookings = exports.getAllBookingsForHotel = exports.createBooking = void 0;
var Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
var booking_1 = require("../domain/dtos/booking");
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var express_1 = require("@clerk/express");
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var createBooking = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var booking_2, user, newBooking, _a, _b, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                booking_2 = booking_1.CreateBookingDTO.safeParse(req.body);
                console.log(booking_2);
                // Validate the request data
                if (!booking_2.success) {
                    throw new validation_error_1.default(booking_2.error.message);
                }
                user = req.auth;
                _b = (_a = Booking_1.default).create;
                _c = {
                    hotelId: booking_2.data.hotelId,
                    userId: user.userId,
                    checkIn: booking_2.data.checkIn,
                    checkOut: booking_2.data.checkOut
                };
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var roomNumber, isRoomAvailable, existingBooking;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    isRoomAvailable = false;
                                    _a.label = 1;
                                case 1:
                                    if (!!isRoomAvailable) return [3 /*break*/, 3];
                                    roomNumber = Math.floor(Math.random() * 1000) + 1;
                                    return [4 /*yield*/, Booking_1.default.findOne({
                                            hotelId: booking_2.data.hotelId,
                                            roomNumber: roomNumber,
                                            $or: [
                                                {
                                                    checkIn: { $lte: booking_2.data.checkOut },
                                                    checkOut: { $gte: booking_2.data.checkIn },
                                                },
                                            ],
                                        })];
                                case 2:
                                    existingBooking = _a.sent();
                                    isRoomAvailable = !existingBooking;
                                    return [3 /*break*/, 1];
                                case 3: return [2 /*return*/, roomNumber];
                            }
                        });
                    }); })()];
            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.roomNumber = _d.sent(),
                        _c)])];
            case 2:
                newBooking = _d.sent();
                // Return the response
                res.status(201).json(newBooking);
                return [2 /*return*/];
            case 3:
                error_1 = _d.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createBooking = createBooking;
var getAllBookingsForHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, bookings, bookingsWithUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                hotelId = req.params.hotelId;
                return [4 /*yield*/, Booking_1.default.find({ hotelId: hotelId })];
            case 1:
                bookings = _a.sent();
                return [4 /*yield*/, Promise.all(bookings.map(function (el) { return __awaiter(void 0, void 0, void 0, function () {
                        var user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, express_1.clerkClient.users.getUser(el.userId)];
                                case 1:
                                    user = _a.sent();
                                    return [2 /*return*/, {
                                            _id: el._id,
                                            hotelId: el.hotelId,
                                            checkIn: el.checkIn,
                                            checkOut: el.checkOut,
                                            roomNumber: el.roomNumber,
                                            user: {
                                                id: user.id,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                            },
                                        }];
                            }
                        });
                    }); }))];
            case 2:
                bookingsWithUser = _a.sent();
                res.status(200).json(bookingsWithUser);
                return [2 /*return*/];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllBookingsForHotel = getAllBookingsForHotel;
var getAllBookings = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookings, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Booking_1.default.find()];
            case 1:
                bookings = _a.sent();
                res.status(200).json(bookings);
                return [2 /*return*/];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllBookings = getAllBookings;
var getBookingById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookingId, booking, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                bookingId = req.params.bookingId;
                return [4 /*yield*/, Booking_1.default.findById(bookingId)];
            case 1:
                booking = _a.sent();
                if (!booking) {
                    throw new not_found_error_1.default("Booking not found");
                }
                res.status(200).json(booking);
                return [2 /*return*/];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookingById = getBookingById;
//# sourceMappingURL=booking.js.map