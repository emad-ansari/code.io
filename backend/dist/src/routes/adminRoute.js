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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const types_1 = require("../@utils/types");
const problem_category_1 = require("../db/problem-category");
const problem_1 = require("../db/problem");
const user_1 = require("../db/user");
// CREATE: new problem category
router.post("/create-problem-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized, role } = req;
    if (!userAuthorized || role != "ADMIN") {
        return res.json({
            success: false,
            msg: "UnAuthorized Access!!",
        });
    }
    try {
        const parsedInput = types_1.ProblemCategorySchema.safeParse(req.body);
        if (!parsedInput.success) {
            return res.json({
                success: false,
                msg: parsedInput.error,
            });
        }
        const result = yield (0, problem_category_1.createNewProblemCategory)(parsedInput.data);
        return res.json({ success: result.success, msg: result.msg });
    }
    catch (error) {
        console.log("CREATE_CATEGORY_ERROR", error);
    }
}));
// GET: All Category
router.post("/get-all-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized, role } = req;
    if (!userAuthorized || role != "ADMIN") {
        return res.json({
            success: false,
            msg: "UnAuthorized Access!!",
        });
    }
    try {
        const result = yield (0, problem_category_1.getAllCategoryOnAdminPage)();
        return res.json({
            success: true,
            msg: "All Categories",
            categories: result,
        });
    }
    catch (error) {
        console.log("GET_ALL_CATEGORY_ERROR", error);
    }
}));
// CREATE: New problem
router.post("/create-problem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized, userId, role } = req;
    if (!userAuthorized || role != "ADMIN") {
        return res.json({
            success: false,
            msg: "UnAuthorized Access!!",
        });
    }
    try {
        const data = req.body;
        const difficultyEnum = (0, types_1.convertDifficultyToEnum)(data.difficulty);
        const parsedInput = types_1.ProblemSchema.safeParse(Object.assign(Object.assign({}, data), { difficulty: difficultyEnum }));
        if (!parsedInput.success) {
            return res.json({
                success: false,
                msg: parsedInput.error,
            });
        }
        const result = yield (0, problem_1.createProblem)(parsedInput.data, userId);
        return res.json({ success: result.success, msg: result.msg });
    }
    catch (error) {
        console.error("Error: ", error.message);
    }
}));
// GET problems on admin page
router.get("get-all-problems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized, role } = req;
    const page = Number(req.query.pageNumber) || 1;
    if (!userAuthorized || role != "ADMIN") {
        return res.status(404).json({
            success: false,
            msg: "UnAuthorized Access!!",
        });
    }
    try {
        const problems = (0, problem_1.getProblemsOnAdminPage)(page);
        return res
            .status(200)
            .json({
            success: true,
            msg: "Successfully fetched all  Problems",
            data: problems,
        });
    }
    catch (error) {
        console.log("GET-ALL_PROBLMES_ERROR", error);
    }
}));
// GET ALL USERS route
router.get("/get-all-users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized, role } = req;
    const { page } = req.body;
    if (!userAuthorized || role != "ADMIN") {
        return res.status(404).json({
            success: false,
            msg: "UnAuthorized Access!!",
        });
    }
    try {
        const users = (0, user_1.getAllUsers)(Number(page));
        return res.status(200).json({ success: true, msg: "All users", data: users });
    }
    catch (error) { }
}));
exports.default = router;
