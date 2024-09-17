import * as fs from "fs";
import { TestCase } from "../db/testcase";

export class TestCaseParser {
	testcaseId: string = "";
	title: string = "";
	testcases: TestCase[] = [];

	extractTestCaseDetails(filePath: string) {
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const data = JSON.parse(fileContent);
		this.testcaseId = data.testcaseId;
		this.title = data.title;
		this.testcases = data.testcases;
		return {
			id: this.testcaseId,
			title: this.title,
			testcases: this.testcases,
		};
	}
}
