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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const problemRoute_1 = __importDefault(require("./src/routes/problemRoute"));
const adminRoute_1 = __importDefault(require("./src/routes/adminRoute"));
const userRoute_1 = __importDefault(require("./src/routes/userRoute"));
const auth_1 = __importDefault(require("./src/middleware/auth"));
const db_1 = __importDefault(require("./src/db"));
const submissionRoute_1 = __importDefault(require("./src/routes/submissionRoute"));
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; // Add your frontend URL here
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true, // Allow credentials (cookies, headers, etc.) to be sent
}));
app.get("/", (req, res) => {
    return res.json("hello there!");
});
app.use("/api/problem", problemRoute_1.default);
app.use('/api/admin', auth_1.default, adminRoute_1.default);
app.use('/api/auth', userRoute_1.default);
app.use('/api/submission', submissionRoute_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.$connect();
            console.log('✅ Connected to database');
            app.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });
            // gracefulShutdown(); // handle SIGINT
        }
        catch (err) {
            console.error('❌ Database connection failed:', err);
            process.exit(1);
        }
    });
}
startServer();
