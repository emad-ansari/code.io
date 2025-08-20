"use strict";
// import * as fs from "fs";
// import { Testcase, TestCaseInput, TestCaseOutput } from "../@utils/types";
// interface Parameter {
// 	parameterId: string;
// 	type: string;
// 	name: string;
// }
// export interface ParsedTestCase {
// 	// after parsing return the testcases in this format
// 	inputs: TestCaseInput[];
// 	output: TestCaseOutput;
// }
// export class GenerateBoilerplateCode {
// 	testcaseId: string = "";
// 	title: string = "";
// 	functionName: string = "";
// 	// returnType: string = "";
// 	parameters: Parameter[] = [];
// 	testcases: Testcase[] = []; // testcases that comes while creating new problem
// 	parsedTestcases: ParsedTestCase[] = [];
// 	returnType: string = "";
// 	// set the values;
// 	constructor(title: string, testcases: Testcase[]) {
// 		this.title = title || "";
// 		const name: string[] = title.split(" ");
// 		this.functionName =
// 			name[0].charAt(0).toLowerCase() + name[0].slice(1) + name[1]; // only take two word
// 		this.testcases = testcases;
// 	}
// 	parseTestcases() {
// 		// 1. parse the input stirng for each testcase
// 		// 2. parse the output string for each testcas
// 	}
// 	parseInputAndOutput(inputString: string, outputString: string ): ParsedTestCase {
// 		const inputs: { name: string; type: string; value: any }[] = [];
// 		const output: { type: string; value: string } = { type: "", value: "" };
// 		// Tokenize the input & output string
// 		const inputTokens = this.tokenize(inputString);
// 		const parsedOutput = this.extractOutputTypeAndValue(outputString);
// 		// console.log("all tokens: ", tokens);
// 		inputTokens.forEach((token) => {
// 			const [variable, value] = token.split("=").map((s) => s.trim());
// 			if (!variable || value === undefined) {
// 				throw new Error(`Invalid format in token: ${token}`);
// 			}
// 			const parsedInput = this.extractInputValueAndType(value);
// 			// Add the parsed result to the inputs array
// 			inputs.push({
// 				name: variable,
// 				type: parsedInput.type,
// 				value: parsedInput.value,
// 			});
// 		});
// 		return {
// 			inputs,
// 			output
// 		}
// 	}
// 	// Helper to tokenize input string (same as before)
// 	tokenize(input: string): string[] {
// 		const tokens: string[] = [];
// 		let current = "";
// 		let inQuotes = false;
// 		let bracketDepth = 0;
// 		for (let i = 0; i < input.length; i++) {
// 			const char = input[i];
// 			if (char === '"' || char === "'") {
// 				inQuotes = !inQuotes;
// 			} else if (!inQuotes) {
// 				if (char === "[" || char === "{") {
// 					bracketDepth++;
// 				} else if (char === "]" || char === "}") {
// 					bracketDepth--;
// 				} else if (char === "," && bracketDepth === 0) {
// 					tokens.push(current.trim());
// 					current = "";
// 					continue;
// 				}
// 			}
// 			current += char;
// 		}
// 		if (current) {
// 			tokens.push(current.trim());
// 		}
// 		return tokens;
// 	}
// 	extractInputValueAndType(value: string): { value: string; type: string } {
// 		// write logic here.
// 		return {
// 			value: "",
// 			type: ""
// 		}
// 	}
// 	extractOutputTypeAndValue(value: string): {type: string, value: string} {
// 		// write logic over here.  ==> "[0]"
// 		return {
// 			type: "",
// 			value: ""
// 		}
// 	}
// 	getJavaBoilerplateCode() {
// 		// since return type is already standard to java type .
// 		// need to format parameters
// 		const inputs = this.parameters
// 			.map((params) => {
// 				return `${params.type} ${params.name}`;
// 			})
// 			.join(", ");
// 		return `public static ${this.returnType} ${this.functionName}(${inputs}){\n\t// write your code here.\n}`;
// 	}
// 	getCppBoilerplateCode() {
// 		const inputs = this.parameters
// 			.map((params) => {
// 				return `${this.mapTypeToCpp(params.type)} ${params.name}`;
// 			})
// 			.join(", ");
// 		return `${this.mapTypeToCpp(this.returnType)} ${
// 			this.functionName
// 		}(${inputs}){\n\t//write your code here.\n}`;
// 	}
// 	getTypescriptBoilerplateCode() {
// 		const inputs = this.parameters
// 			.map((params) => {
// 				return `${params.name}: ${this.mapTypeToTypescript(
// 					params.type
// 				)}`;
// 			})
// 			.join(", ");
// 		return `function ${
// 			this.functionName
// 		}(${inputs}): ${this.mapTypeToTypescript(
// 			this.returnType
// 		)}{\n\t// write your code here.\n}`;
// 	}
// 	getJavascriptBoilerplateCode() {
// 		const inputs = this.parameters
// 			.map((params) => {
// 				return `${params.name}`;
// 			})
// 			.join(", ");
// 		const templateCode = `/*\n\t${this.parameters
// 			.map(
// 				(params) =>
// 					`@param{${this.mapTypeToTypescript(params.type)}} ${
// 						params.name
// 					}`
// 			)
// 			.join("\n\t")}\n\t@return{${this.mapTypeToTypescript(
// 			this.returnType
// 		)}}\n*/\n\nvar ${
// 			this.functionName
// 		} = function(${inputs}) {\n\t//write your code here.\n};`;
// 		return templateCode;
// 	}
// 	mapTypeToCpp(returnType: string) {
// 		switch (returnType) {
// 			case "void":
// 				return "void";
// 			case "int":
// 				return "int";
// 			case "int[]":
// 				return "int[]";
// 			case "String":
// 				return "string";
// 			case "boolean":
// 				return "bool";
// 			case "char":
// 				return "char";
// 			case "String[]":
// 			case "char[]":
// 				return "vector<string>";
// 			case "char[][]":
// 				return "vector<vector<string>>";
// 			case "List<Integer>":
// 				return "vector<int>";
// 			case "List<String>":
// 				return "vector<string>";
// 			case "int[][]":
// 			case "List<List<Integer>>":
// 				return "vector<vector<int>>";
// 			case "int[][]":
// 			case "List<List<String>>":
// 				return "vector<vector<string>>";
// 			default:
// 				return "";
// 		}
// 	}
// 	mapTypeToTypescript(returnType: string) {
// 		switch (returnType) {
// 			case "void":
// 				return "void";
// 			case "int":
// 				return "number";
// 			case "List<Integer>":
// 			case "int[]":
// 				return "number[]";
// 			case "char":
// 			case "string":
// 			case "String":
// 				return "string";
// 			case "Boolean":
// 			case "boolean":
// 				return "boolean";
// 			case "string[]":
// 			case "String[]":
// 				return "string[]";
// 			case "int[][]":
// 			case "List<List<Integer>>":
// 				return "number[][]";
// 			default:
// 				return "number";
// 		}
// 	}
// }
