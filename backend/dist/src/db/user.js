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
exports.createUser = createUser;
exports.findUser = findUser;
exports.getAllUsers = getAllUsers;
const _1 = __importDefault(require("."));
const bcrypt_1 = __importDefault(require("bcrypt"));
// CREATE NEW USER
function createUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const allowedAdminsEmails = ((_a = process.env.ALLOWED_ADMINS) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
            const userRole = allowedAdminsEmails.includes(email) ? "ADMIN" : "USER";
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield _1.default.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    role: userRole,
                },
            });
            return {
                success: true,
                msg: "User Created Successfully"
            };
        }
        catch (error) {
            return {
                success: false,
                msg: error.message,
            };
        }
    });
}
// FIND NEW USER
function findUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield _1.default.user.findFirst({
                where: {
                    email,
                },
                select: {
                    password: true,
                    id: true,
                    role: true,
                },
            });
            if (!user) {
                return {
                    success: false,
                    msg: "User Not found",
                };
            }
            else {
                const matchPassword = yield bcrypt_1.default.compare(password, user.password);
                if (matchPassword) {
                    return {
                        success: true,
                        msg: "User found",
                        userId: user.id,
                        role: user.role,
                    };
                }
                else {
                    return {
                        success: false,
                        msg: "Incorrect Password!!",
                    };
                }
            }
        }
        catch (error) {
            return {
                success: false,
                msg: error.message,
            };
        }
    });
}
// GET ALL USERS ON ADMIN PAGE
function getAllUsers(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield _1.default.user.findMany({
                skip: (page - 1) * 10,
                take: 10,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            return users;
        }
        catch (error) {
            console.log("GET_ALL_USERS_DB_ERROR", error);
        }
    });
}
