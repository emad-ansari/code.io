"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStatusToEnum = exports.convertDifficultyToEnum = exports.LNAGUAGE_MAPPING = exports.LoginInputSchema = exports.SignUpInputSchema = exports.ProblemSchema = exports.TemplateCodeSchema = exports.TestcaseSchema = exports.ProblemCategorySchema = void 0;
const zod_1 = require("zod");
exports.ProblemCategorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    title: zod_1.z.string(),
    imgUrl: zod_1.z.string(),
    tags: zod_1.z.string().array(),
});
exports.TestcaseSchema = zod_1.z.array(zod_1.z.object({
    input: zod_1.z.string(),
    expected_output: zod_1.z.string(),
    isSample: zod_1.z.boolean(),
}));
exports.TemplateCodeSchema = zod_1.z.array(zod_1.z.object({
    language: zod_1.z.string(),
    full_template: zod_1.z.string(),
    boiler_code: zod_1.z.string(),
}));
exports.ProblemSchema = zod_1.z.object({
    problemCategory: zod_1.z.string(),
    problemTitle: zod_1.z.string(),
    description: zod_1.z.string(),
    difficulty: zod_1.z.enum(["EASY", "MEDIUM", "HARD"]),
    tags: zod_1.z.string().array(),
    testcases: exports.TestcaseSchema,
    templates: exports.TemplateCodeSchema,
});
exports.SignUpInputSchema = zod_1.z.object({
    username: zod_1.z.string().min(4).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4).max(20),
});
exports.LoginInputSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(20),
});
var UserSubmissionStatus;
(function (UserSubmissionStatus) {
    UserSubmissionStatus[UserSubmissionStatus["ACCEPTED"] = 0] = "ACCEPTED";
    UserSubmissionStatus[UserSubmissionStatus["WRONG_ANSWER"] = 1] = "WRONG_ANSWER";
    UserSubmissionStatus[UserSubmissionStatus["TIME_LIMIT_EXCEEDED"] = 2] = "TIME_LIMIT_EXCEEDED";
    UserSubmissionStatus[UserSubmissionStatus["MEMORY_LIMIT_EXCEEDED"] = 3] = "MEMORY_LIMIT_EXCEEDED";
    UserSubmissionStatus[UserSubmissionStatus["RUNTIME_ERROR"] = 4] = "RUNTIME_ERROR";
    UserSubmissionStatus[UserSubmissionStatus["COMPILATION_ERROR"] = 5] = "COMPILATION_ERROR";
})(UserSubmissionStatus || (UserSubmissionStatus = {}));
// export interface Modifiedsubmission extends SubmissionsResult { // rename it as FormattedSubmission.
// 	inputs: TestCaseInput[]
// }
exports.LNAGUAGE_MAPPING = {
    js: { name: "javascript", languageId: 63 },
    cpp: { name: "cpp", languageId: 54 },
    typescript: { name: "typescript", languageId: 74 },
    java: { name: "java", languageId: 62 },
    python: { name: "python", languageId: 71 },
};
const convertDifficultyToEnum = (difficulty) => {
    switch (difficulty) {
        case "Easy":
            return "EASY";
        case "Medium":
            return "MEDIUM";
        case "Hard":
            return "HARD";
        default:
            return "";
    }
};
exports.convertDifficultyToEnum = convertDifficultyToEnum;
const convertStatusToEnum = (status) => {
    switch (status) {
        case "Todo":
            return "TODO";
        case "Solved":
            return "SOLVED";
        case "Attempted":
            return "ATTEMPTED";
        default:
            return "";
    }
};
exports.convertStatusToEnum = convertStatusToEnum;
