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
const auth_1 = __importDefault(require("../middleware/auth"));
const problem_1 = require("../db/problem");
// GET ALL PROBLEMS
router.get("/get-problems", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized } = req;
    const categoryName = req.query.category;
    const page = Number(req.query.pageNumber) || 1;
    const problemPerPage = Number(req.query.pageSize);
    const difficulty = req.query.difficulty;
    const status = req.query.status;
    const searchKeywords = req.query.searchKeywords;
    try {
        const filterQuery = {};
        if (difficulty)
            filterQuery.difficulty = difficulty;
        if (status)
            filterQuery.status = status;
        if (searchKeywords)
            filterQuery.searchKeywords = searchKeywords;
        const result = yield (0, problem_1.getAllProblems)(categoryName, page, problemPerPage, filterQuery, userAuthorized);
        return res.status(200).json({
            success: true,
            msg: "Successfully fetched all problems",
            data: {
                problems: result === null || result === void 0 ? void 0 : result.problems,
                totalPages: result === null || result === void 0 ? void 0 : result.totalCount,
            },
        });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ success: false, message: e.message });
    }
}));
// GET PROBLEM DETAILS
router.get("/get-problem-detail/:problemId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemId } = req.params;
    const { userAuthorized } = req;
    try {
        const problemDetails = yield (0, problem_1.getProblemDetail)(problemId, userAuthorized);
        return res.status(200).json({
            success: true,
            msg: "Successfull fetched problem Details",
            data: problemDetails,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}));
exports.default = router;
// // router.post('/judge0-callback', async(req: Request, res: Response) => {
// // 	try {
// // 		const payload = req.body; // Parse the JSON payload sent by Judge0
// // 		console.log('Judge0 callback received:', payload);
// // 	}
// // 	catch(error: any){
// // 		console.error('Error handling Judge0 callback:', error);
// // 		res.status(500).send('Internal Server Error'); // Handle error appropriately
// // 	}
// // })
// // when you are going to submit the code
