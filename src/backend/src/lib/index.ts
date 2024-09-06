import * as fs from "fs";

export class ParseProblemDetails {
	title: string = "";
	description: string = "";
	difficulty: string = "";
	functionName: string = "";
	returnType: string = "";
	userId: string = "";
	testcases: {input: string, output: string}[] = [];

	extractProblemDetails(filePath: string) {
		// Read the file content
		const content = fs.readFileSync(filePath, "utf-8");

		// Split the content into lines
		const lines = content.split("\n");
		let testCaseStart = false;
		let testCasesString = "";

		// Extract basic details
		lines.forEach((line) => {
			line = line.trim();

			if (line.startsWith("ProblemTitle:")) {
				this.title = line.replace("ProblemTitle: ", "").trim();
			} else if (line.startsWith("Description:")) {
				this.description = line.replace("Description: ", "").trim();
			} else if (line.startsWith("Difficulty:")) {
				this.difficulty = line.replace("Difficulty: ", "").trim();
			} else if (line.startsWith("Function Name:")) {
				this.functionName = line.replace("Function Name: ", "").trim();
			} else if (line.startsWith("Return Type:")) {
				this.returnType = line.replace("Return Type: ", "").trim();
			} else if (line.startsWith("User Id:")) {
				this.userId = line.replace("User Id: ", "").trim();
			} else if (line.startsWith("TestCases:")) {
				testCaseStart = true;
			} else if (testCaseStart) {
				testCasesString += line;
			}
		});
		this.testcases = this.extractTestCases(testCasesString);
		// console.log("Extracted testcases: ", testcases);
		return {
			title: this.title,
			description: this.description,
			difficulty: this.difficulty,
			userId: this.userId,
			testcases: this.testcases,
		};
	}
	private extractDetail(lines: string[], key: string): string {
		const line = lines.find((line) => line.startsWith(key));
		return line ? line.split(":")[1].trim() : "";
	}

	private extractTestCases(testCasesString: string) {
		const inputPattern = /(\w+)\s*=\s*([^,]+)(?=,|$)/g;

		// Ensure the testCasesString is properly formatted as a JSON array
		testCasesString = `[${testCasesString.replace(/^\[|\]$/g, "")}]`
			.replace(/(\s*[\[\]\{\}]\s*)/g, (match) => match.trim()) // Trim surrounding spaces from brackets
			.replace(/,\s*}/g, "}"); // Remove trailing commas before closing braces

		// Parse test cases
		try {
			const parsedTestCases = JSON.parse(testCasesString);
			// console.log("Parsed test cases: ", parsedTestCases);

			// const testcases = parsedTestCases.map((testcase: any) => {
			// 	const inputs = [];
			// 	let match;

			// 	// Use regex to capture all variable-value pairs in the input
			// 	while ((match = inputPattern.exec(testcase.input)) !== null) {
			// 		const variableName = match[1].trim();
			// 		let value = match[2].trim();

			// 		// Determine the type of the value (int, array, matrix)
			// 		let type;
			// 		if (/^\[.*\]$/.test(value)) {
			// 			type = "array";
			// 			if (/^\[\[.*\]\]$/.test(value)) {
			// 				type = "matrix"; // It's a matrix
			// 			}
			// 		} else if (/^\d+$/.test(value)) {
			// 			type = "int";
			// 		} else {
			// 			type = "string";
			// 		}

			// 		// Add the variable to the inputs array with its inferred type and value
			// 		inputs.push({ type, variablename: variableName, value });
			// 	}

			// 	return {
			// 		inputs,
			// 		output: testcase.output,
			// 	};
			// });

			return parsedTestCases;
		} catch (error) {
			console.error("Error parsing test cases:", error);
			return [];
		}
	}
}