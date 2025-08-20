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
const express_1 = require("express");
const router = (0, express_1.Router)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const user_1 = require("../db/user");
const types_1 = require("../@utils/types");
const auth_1 = require("../middleware/auth");
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.SignUpInputSchema.safeParse(req.body.data);
    console.log("route hit: ", req.body);
    if (!parsedInput.success) {
        return res
            .status(400)
            .json({ success: false, msg: parsedInput.error });
    }
    try {
        const { username, email, password } = parsedInput.data;
        console.log(username, email, password);
        // check if user already exist or not
        const user = yield db_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            return res.json({ success: false, msg: "User already exist" });
        }
        // otherwise user don't exist then create new user
        const newUser = yield (0, user_1.createUser)(username, email, password);
        if (!newUser.success) {
            return res.json({ success: false, msg: newUser.msg });
        }
        return res
            .status(201)
            .json({ success: true, msg: "User created successfully" });
    }
    catch (error) {
        console.error("SIGNUP_ERROR: ", error.messag);
        return res.status(500).json({ success: false, msg: error.message });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user data: ", req.body);
    const parsedInput = types_1.LoginInputSchema.safeParse(req.body.data);
    if (!parsedInput.success) {
        return res
            .status(400)
            .json({ success: false, msg: parsedInput.error });
    }
    try {
        const { email, password } = parsedInput.data;
        console.log(email, password);
        // check if user exist or not
        const user = yield (0, user_1.findUser)(email, password);
        if (!user.success || user.userId === undefined) {
            return res.json({ success: false, msg: user.msg });
        }
        const accessToken = (0, auth_1.generateAccessToken)(user.userId, user.role);
        const refreshToken = (0, auth_1.generateRefreshToken)(user.userId, user.role);
        // Set refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // max age 7days  [putting cookie expiration is neccessary]
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/api/auth/", // This end point only
        });
        return res.status(201).json({
            success: true,
            msg: "login successfully",
            data: { token: accessToken },
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, msg: error.message });
    }
}));
// Refresh token endpoint
router.post("/refresh-token", (req, res) => {
    const cookie = req.cookies; // Get refresh token from the cookie
    const refreshToken = cookie.refreshToken;
    if (!refreshToken) {
        return res
            .status(401)
            .json({ success: false, msg: "No refresh token found" });
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
        if (err) {
            return res
                .status(401)
                .json({ success: false, msg: err.message });
        }
        // add another security level -> that check whether the user exist in database or not other wise just send 401 resposnse.
        const newAccessToken = (0, auth_1.generateAccessToken)(payload.userId, payload.role);
        return res.status(200).json({
            success: true,
            data: { accessToken: newAccessToken },
            msg: "token refresh successfully",
        });
    });
});
router.post("/logout", (req, res) => {
    var _a;
    if (!((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken))
        return res
            .status(204)
            .json({ success: false, msg: "No refresh token found" });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: "none",
        path: "/api/user/", // This endpoint only
    });
    res.json({ success: true, msg: "Logged out successfully" });
});
exports.default = router;
