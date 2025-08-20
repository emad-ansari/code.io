"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const auth_1 = __importDefault(require("../middleware/auth"));
const types_1 = require("../@utils/types");
router.post("/create-problem", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized } = req;
    if (!userAuthorized) {
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    const { userId } = req;
    try {
        const parsedProblem = types_1.ProblemSchema.safeParse(req.body);
        if (parsedProblem.success) {
            const { title } = parsedProblem.data;
            const filePath = `src/contribution/newproblem/${title.replace(/\s+/g, "_")}.json`;
            // attach user id to problem to identify which user create this problem
            const problemInfo = Object.assign(Object.assign({}, parsedProblem.data), { userId });
            console.log('new problem info, ', problemInfo);
            const jsonString = JSON.stringify(problemInfo, null, 2);
            fs.writeFile(filePath, jsonString, (err) => {
                if (err) {
                    console.log("Error writing file", err);
                    return res.status(500).json({ success: false, message: "server is not able to save you problem please try again!!" });
                }
                else {
                    console.log("Successfully wrote file");
                    return res.status(201).json({ success: true, message: "Problem has been saved for review, thank for contribution!" });
                }
            });
        }
        else {
            return res.status(400).json({ success: false, message: parsedProblem.error });
        }
    }
    catch (error) {
        console.error("Error: ", error.message);
        return res.status(400).json({ success: false, msessage: error.message });
    }
}));
router.post("/testcase", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuthorized } = req;
    if (!userAuthorized) {
        return res.status(401).json({ success: false, message: "Unauthorized!!" });
    }
    const { userId } = req;
    try {
        const parsedTestcaseInput = types_1.NewTestCaseSchema.safeParse(req.body);
        if (parsedTestcaseInput.success) {
            const { problemTitle } = parsedTestcaseInput.data;
            const filePath = `src/contribution/newtestcase/${problemTitle.replace(/\s+/g, "_")}.json`;
            // attach user id to testcase to identify which user create this problem
            const testcaseInfo = Object.assign(Object.assign({}, parsedTestcaseInput.data), { userId });
            const testcaseString = JSON.stringify(testcaseInfo, null, 2);
            fs.writeFile(filePath, testcaseString, (err) => {
                if (err) {
                    console.error("Error while writing testcase file:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Not able to save the problem please try after some time",
                    });
                }
                else {
                    // [Todo] - send an email to user as a response
                    return res.status(201).json({
                        success: true,
                        message: "Your testcase has been saved for review, thankyou for contribution",
                    });
                }
            });
        }
        else {
            return res.status(400).json({ success: false, message: parsedTestcaseInput.error });
        }
    }
    catch (error) {
        console.error("Error: ", error.message);
        return res.status(400).json({ success: false, msessage: error.message });
    }
}));
exports.default = router;
