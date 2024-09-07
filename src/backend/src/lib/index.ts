import * as fs from "fs";

export class ParseProblemDetails {
	title: string = "";
	description: string = "";
	difficulty: string = "";
	functionName: string = "";
	returnType: string = "";
	userId: string = "";
	parameters: string = "";
	testcases: { input: string; output: string }[] = [];

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
			} else if (line.startsWith("Parameters:")) {
				this.parameters = line.replace("Parameters: ", "").trim();
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

	private extractTestCases(testCasesString: string) {
		// Ensure the testCasesString is properly formatted as a JSON array
		testCasesString = `[${testCasesString.replace(/^\[|\]$/g, "")}]`
			.replace(/(\s*[\[\]\{\}]\s*)/g, (match) => match.trim()) // Trim surrounding spaces from brackets
			.replace(/,\s*}/g, "}"); // Remove trailing commas before closing braces

		// Parse test cases
		try {
			const parsedTestCases = JSON.parse(testCasesString);
			return parsedTestCases;
		} catch (error) {
			console.error("Error parsing test cases:", error);
			return [];
		}
	}

	generateJavaBoilerplatecode() {
		const java = `public ${this.returnType} ${this.functionName}(${this.parameters}){\n\t // write your code here.}`;
	}

	generateCppBoilerPlateCode() {
		// get the parameters for cpp
		// char[][] board, String[] words --> vector<vector<char>>& board, vector<string>& words
		// const params = this.getCppParams(this.parameters);
		const cpp = `${this.mapTypeToCpp(this.returnType)} ${this.functionName}()`
	}	

	getType(){
		
	}

	mapTypeToCpp(returnType: string) {
		switch (returnType) {
			case "int":
				return "int";
			case "int[]":
				return "int[]";
			case "String" || "string":
				return "string";
			case "Boolean" || "boolean":
				return "bool";
			case "Char" || "char":
				return "char";
			case "char[]" || "Char[]":
				return "vector<string>"
			case "char[][]" :
				return "vector<vector<string>>"
			case "String[]" || "string[]":
				return "string[]";
			case "List<Integer>":
				return "vector<int>";
			case "List<String>" :
				return "vector<string>";
			case "List<List<Integer>>" || "int[][]":
				return "vector<vector<int>>";
			case "List<List<String>>" || "int[][]":
				return "vector<vector<string>>";
			default:
				return "";
		}
	}

	getTypeScriptReturnType(returnType: string) {
		switch (returnType) {
			case "int":
				return "number";
			case "int[]" || "List<Integer>":
				return "number[]";
			case "String" || "string" || 'char':
				return "string";
			case "Boolean" || "boolean":
				return "boolean";
			case "String[]" || "string[]":
				return "string[]";
			case "List<List<Integer>>" || "int[][]":
				return "number[][]";
			default:
				return "number";
		}
	}
}

// const inputPattern = /(\w+)\s*=\s*([^,]+)(?=,|$)/g;
// const testcases = parsedTestCases.map((testcase: any) => {
// 	// const inputs = [];
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
// 		this.inputFields.push({ type, name: variableName });
// 	}
// 	console.log("Extracted input fields: ", this.inputFields);
// 	// return {
// 	// 	inputs,
// 	// 	output: testcase.output,
// 	// };
// });
