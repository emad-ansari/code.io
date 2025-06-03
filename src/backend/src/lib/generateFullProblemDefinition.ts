import { TestCaseReturnType, TestCaseInput, TestCaseOutput } from "../@utils/types";
import { CppCodeGenerator } from "./CppGenerator";
import { JavaCodeGenerator } from "./JavaGenerator";


export class GenerateFullProblemDefinition {
	functionName: string = "";
	inputs: TestCaseInput[] = [];
	output: TestCaseOutput = { type: "", value: "" };

	parseTestCase(testcase: TestCaseReturnType) {
		this.inputs = testcase.inputs;
		this.output =
			testcase.output !== null
				? testcase.output
				: { type: "", value: "" };
		const title =
			testcase.title !== null
				? testcase.title.replaceAll(" ", "").trim()
				: "";
		this.functionName = title.charAt(0).toLowerCase() + title.slice(1);
	}

	getProblem(
		languageId: number,
		code: string
	): { fullBoilerplatecode: string; stdin: string; stdout: string } {
		const fullBoilerplatecode: string = this.getBoilerplateCode(languageId);
		const stdin = this.inputs
			.map((input) => {
				const stdInput = `${input.value.replace(/[\[\],\s]+/g, " ")}`;
				return stdInput.replace(",", "").trim();
			})
			.join("\n");
		const stdout = this.output.value;
		return {
			fullBoilerplatecode: fullBoilerplatecode.replace(
				"__USER_CODE_HERE__",
				code
			),
			stdin,
			stdout,
		};
	}

	getBoilerplateCode(languageId: number) {
		switch (languageId) {
			case 62:
				return this.generateJava();
			case 71:
			// return pythonFullCode();
			case 74:
			// return typescriptFullCode();
			case 63:
			// return javascriptFullCode();
			case 54:
				return this.generateCpp()
			default:
				return "";
		}
	}
	// generator full problem definition for java.
	generateJava() {
		const javaCodeGenerator = new JavaCodeGenerator(
			this.functionName,
			this.inputs,
			this.output
		)
		return  javaCodeGenerator.generateCode();
	}

	// generate CPP full problem definition
	generateCpp() {
		const cppCodeGenerator = new CppCodeGenerator(
			this.functionName,
			this.inputs,
			this.output
		);
		return cppCodeGenerator.generateCode();
	}
	// generate typescript full problem definition
	generateTypeScript() {}
}
