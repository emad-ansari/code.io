import * as fs from "fs";


interface Parameter {
	parameterId: string;
	type: string;
	name: string;
}

export interface TestCase {
	testcaseId: string;
	inputs: {
		name: string;
		type: string;
		value: string;
	}[];
	output: {
		type: string;
		value: string;
	};
}

export class ParseProblemDetails {
	id: string = "";
	title: string = "";
	description: string = "";
	difficulty: string = "";
	functionName: string = "";
	returnType: string = "";
	userId: string = "";
	parameters: Parameter[] = [];
	testcases: TestCase[] = [];

	extractProblemDetails(filePath: string) {
		// Read the JSON file
		const fileContent = fs.readFileSync(filePath, "utf-8");

		const data = JSON.parse(fileContent);
		this.id = data.id;
		this.title = data.title || "";
		this.description = data.description || "";
		this.difficulty = data.difficulty || "";
		this.functionName = data.title.replace(' ' ,'').trim() || "";
		this.returnType = data.returnType || "";
		this.userId = data.userId;
		this.parameters = data.parameters;
		this.testcases = data.testcases;

		const modifiedTestcases = this.testcases.map(testcase => {
			return {inputs: testcase.inputs, output: testcase.output};
		})		

		return {
			id: this.id,
			title: this.title,
			description: this.description,
			difficulty: this.difficulty,
			userId: this.userId,
			testcases: modifiedTestcases
		};
	}

	private extractTestCases(testCasesString: string) {}


	getJavaBoilerplateCode() {
		// since return type is already standard to java type .
		// need to format parameters
		const inputs = this.parameters
			.map((params) => {
				return `${params.type} ${params.name}`;
			})
			.join(", ");

		return `public static ${this.returnType} ${this.functionName}(${inputs}){\n\t// write your code here.\n}`;
	}

	getCppBoilerplateCode() {
		const inputs = this.parameters
			.map((params) => {
				return `${this.mapTypeToCpp(params.type)} ${params.name}`;
			})
			.join(", ");

		return  `${this.mapTypeToCpp(this.returnType)} ${
			this.functionName
		}(${inputs}){\n\t // write your code here. \n}`;
	}

	getTypescriptBoilerplateCode(){
		const inputs = this.parameters.map(params => {
			return `${params.name}: ${this.mapTypeToTypescript(params.type)}`
		}).join(', ');

		return  `function ${this.functionName}(${inputs}): ${this.mapTypeToTypescript(this.returnType)}{\n\t // write your code here.\n}`

	}

	mapTypeToCpp(returnType: string) {
		switch (returnType) {
			case "int":
				return "int";
			case "int[]":
				return "int[]";
			case "String":
				return "string";
			case "boolean":
				return "bool";
			case "char":
				return "char";
			case "char[]" || "String[]":
				return "vector<string>";
			case "char[][]":
				return "vector<vector<string>>";
			case "List<Integer>":
				return "vector<int>";
			case "List<String>":
				return "vector<string>";
			case "List<List<Integer>>" || "int[][]":
				return "vector<vector<int>>";
			case "List<List<String>>" || "int[][]":
				return "vector<vector<string>>";
			default:
				return "";
		}
	}

	mapTypeToTypescript(returnType: string) {
		switch (returnType) {
			case "int":
				return "number";
			case "int[]" || "List<Integer>":
				return "number[]";
			case "String" || "string" || "char":
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
