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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;
        if (!token) {
            req.userAuthorized = false;
            return next();
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
            if (err) {
                // Handle token verification errors
                console.log("this is token error: ", err.message);
                return res
                    .status(403)
                    .json({ message: "Invalid token", err: err.message });
            }
            // If the token is valid, set the user information in the request object
            req.userAuthorized = true;
            req.userId = payload.userId; // Cast payload to any to access userId
            req.role = payload.role; // Cast payload to any to access role
            return next();
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// Function to generate tokens
const generateAccessToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId: userId, role: role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId, role) => {
    console.log("refrehs key ", process.env.JWT_REFRESH_SECRET);
    return jsonwebtoken_1.default.sign({ userId: userId, role: role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
exports.default = auth;
