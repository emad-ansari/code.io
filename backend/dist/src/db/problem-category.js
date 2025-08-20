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
exports.createNewProblemCategory = createNewProblemCategory;
exports.getAllCategoryOnAdminPage = getAllCategoryOnAdminPage;
exports.getAllCategory = getAllCategory;
const index_1 = __importDefault(require("../db/index"));
function createNewProblemCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield index_1.default.problemCategory.findFirst({
                where: {
                    name: data.name
                }
            });
            if (category) {
                return {
                    success: false,
                    msg: "Category Already exist please give another name"
                };
            }
            // otherwise create new category
            const newCategory = yield index_1.default.problemCategory.create({
                data: {
                    name: data.name,
                    title: data.title,
                    imgUrl: data.imgUrl,
                    tags: data.tags
                }
            });
            return {
                success: true,
                msg: "Category created successfully"
            };
        }
        catch (error) {
            console.log('CREATE_NEW_CATEGORY_DB_ERROR: ', error);
            return {
                success: false,
                msg: error
            };
        }
    });
}
function getAllCategoryOnAdminPage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield index_1.default.problemCategory.findMany();
            return categories;
        }
        catch (error) {
            console.log('GET_ALL_CATEGORY_ON_ADMIN_PAGE_ERROR: ', error);
        }
    });
}
// GET ALL CATEGORY On user page
function getAllCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield index_1.default.problemCategory.findMany();
            return categories;
        }
        catch (error) {
            console.log('GET_ALL_CATEGORY_ERROR: ', error);
        }
    });
}
