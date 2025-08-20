"use strict";
// import { TestCaseInput, TestCaseOutput } from "../@utils/types";
// export class JavaCodeGenerator {
// 	// generate java full problem definition.
// 	private functionName: string;
// 	private inputs: TestCaseInput[];
// 	private output: TestCaseOutput;
// 	constructor(
// 		functionName: string,
// 		inputs: TestCaseInput[],
// 		output: TestCaseOutput
// 	) {
// 		this.functionName = functionName;
// 		this.inputs = inputs || [];
// 		this.output = output || { type: "void", value: "" };
// 	}
// 	generateCode() {
// 		let functionCall = "";
// 		let outputWrite = "";
// 		const argument = this.inputs
// 			.map((input) => {
// 				return `${input.name}`;
// 			})
// 			.join(", ");
// 		if (this.output.type == "void") {
// 			functionCall = `${this.functionName}(${argument});`;
// 		} else {
// 			functionCall = `${this.output.type} result =  ${this.functionName}(${argument});`;
// 			if (this.output.type === "int[]") {
// 				outputWrite = "System.out.print(Arrays.toString(result));";
// 			} else if (this.output.type === "int[][]") {
// 				outputWrite = "System.out.print(Arrays.deepToString(result));";
// 			} else {
// 				outputWrite = "System.out.print(result);";
// 			}
// 		}
// 		const inputRead = `
//         Scanner scanner = new Scanner(System.in);
//         ${this.inputs
// 			.map((input) => {
// 				let javaType = this.extractJavaWrapperClass(input.type);
// 				if (this.hasSquareBrackets(input.type)) {
// 					if (input.type.includes("[][]")) {
// 						// 2D Arrays
// 						if (input.type.startsWith("int")) {
// 							return `int[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> Arrays.stream(line.split(" ")).mapToInt(Integer::parseInt).toArray()).toArray(int[][]::new);`;
// 						} else if (input.type.startsWith("boolean")) {
// 							return `boolean[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> Arrays.stream(line.split(" ")).map(Boolean::parseBoolean).toArray()).toArray(boolean[][]::new);`;
// 						} else if (input.type.startsWith("char")) {
// 							return `char[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> line.replace(" ", "").toCharArray()).toArray(char[][]::new);`;
// 						} else {
// 							return `String[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> line.split(" ")).toArray(String[][]::new);`;
// 						}
// 					} else {
// 						// 1D Arrays
// 						if (input.type.startsWith("int")) {
// 							return `int[] ${input.name} = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();`;
// 						} else if (input.type.startsWith("boolean")) {
// 							return `boolean[] ${input.name} = Arrays.stream(scanner.nextLine().split(" ")).map(Boolean::parseBoolean).toArray();`;
// 						} else if (input.type.startsWith("char")) {
// 							return `char[] ${input.name} = scanner.nextLine().replace(" ", "").toCharArray();`;
// 						} else {
// 							return `String[] ${input.name} = scanner.nextLine().split(" ");`;
// 						}
// 					}
// 				} else if (this.hasListPattern(input.type)) {
// 					let parseFunction = this.getParseFunctionForList(javaType);
// 					if (input.type.startsWith("List<List<")) {
// 						// List of Lists
// 						return `List<List<${javaType}>> ${input.name} = new ArrayList<>();
//                             String[] lines = scanner.nextLine().split(";");
//                             for (String line : lines) {
//                                 List<${javaType}> innerList = Arrays.stream(line.split(" "))
//                                                                   .map(${parseFunction})
//                                                                   .collect(Collectors.toList());
//                                 ${input.name}.add(innerList);
//                             }`;
// 					} else {
// 						// Single List
// 						return `List<${javaType}> ${input.name} = new ArrayList<>();
//                             Arrays.stream(scanner.nextLine().split(" "))
//                                   .map(${parseFunction})
//                                   .forEach(${input.name}::add);`;
// 					}
// 				} else {
// 					// Handle simple types
// 					return `${input.type} ${
// 						input.name
// 					} = scanner.${this.getScannerMethod(input.type)};`;
// 				}
// 			})
// 			.join("\n")}`;
// 		return `
//         import java.util.*;
//         import java.io.*;
//         import java.util.stream.Collectors;
//         public class Main {
//             public static void main(String[] args){
//                 ${inputRead}
//                 ${functionCall}
//                 ${outputWrite}
//             }
//             __USER_CODE_HERE__
//         }
//         `;
// 	}
// 	hasSquareBrackets(str: string): boolean {
// 		// Regular expression to match [] or [][]
// 		const regex = /\[\](\[\])?/;
// 		// Test the string against the regex
// 		return regex.test(str);
// 	}
// 	hasListPattern(str: string): boolean {
// 		// Regular expression to match List< or List<List<
// 		const regex = /List<(?:List<)?/;
// 		// Test the string against the regex
// 		return regex.test(str);
// 	}
// 	getParseFunctionForList(type: string) {
// 		if (type === "Integer") return "Integer::parseInt";
// 		if (type === "Boolean") return "Boolean::parseBoolean";
// 		if (type === "Character") return "s -> s.charAt(0)";
// 		return "s -> s"; // Default to String
// 	}
// 	getScannerMethod(type: string) {
// 		if (type === "int") return "nextInt()";
// 		if (type === "boolean") return "nextBoolean()";
// 		if (type === "char") return "next().charAt(0)";
// 		return "next()"; // Default to String
// 	}
// 	extractJavaWrapperClass(listType: string): string {
// 		// Regular expression to match the innermost type inside List<>
// 		const regex = /List<([^>]+)>/;
// 		let match = listType.match(regex);
// 		// While the match is a nested List, keep extracting the innermost type
// 		while (match && match[1].startsWith("List<")) {
// 			match = match[1].match(regex);
// 		}
// 		// Return the innermost type
// 		return match ? match[1] : listType;
// 	}
// }
