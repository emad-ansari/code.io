import { TestCase, ParseProblemDetails } from ".";


export class GenerateFullProblemDefinition {
    functionName: string = "";
    inputs: {type: string, name: string, value: string}[] = [];
    output: { type: string, value: string } = {type: '', value: ''} ;

    parseTestCase(testcase: TestCase){


    }

    getProblem(languageId: number, code: string):{ fullBoilerplatecode: string, stdin: string, stdout: string }{
        
        const fullBoilerplatecode: string =  this.getBoilerplateCode(languageId);
        const stdin = this.inputs.map(input => {
            return `${input.value.replace('[', '').replace(']', '').replace(',', '')}`
        }).join('\n')
        const stdout = this.output.value;

        return {
            fullBoilerplatecode: fullBoilerplatecode.replace("__USER_CODE_HERE__", code),
            stdin,
            stdout
        }

    }

    generateJava(){
        let functionCall = ''
        let outputWrite = "";

        const argument = this.inputs.map(input => {
            return `${input.name}`
        }).join(', ')


        if (this.output.type == "void"){
            functionCall = `${this.functionName}(${argument})`
        }
        else {
            functionCall = `${this.output.type} result =  ${this.functionName}(${argument})`
            outputWrite = "System.out.println(result);"
        }

        const inputRead = `
        Scanner scanner = new Scanner(System.in);
        ${this.inputs.map(input => {
            let javaType = this.extractJavaWrapperClass(input.type);
            if (this.hasSquareBrackets(input.type)) {
                // Handle arrays
                return `int[] ${input.name} = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();`;
            } else if (this.hasListPattern(input.type)) {
                // Handle Lists
                return `List<Integer> ${input.name} = new ArrayList<>();\n` +
                       `Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).forEach(${input.name}::add);`;
            } else {
                // Handle simple types
                return `${javaType} ${input.name} = scanner.nextInt();`;
            }
        }).join('\n')}`;


        return `
        import java.util.*;
        import java.io.*;

        public class Main {
            public static void main(String[] args){
                ${inputRead}
                ${functionCall}
                ${outputWrite}
            }

            __USER_CODE_HERE__
        }
        `
    }
     hasSquareBrackets(str: string): boolean {
        // Regular expression to match [] or [][]
        const regex = /\[\](\[\])?/;
      
        // Test the string against the regex
        return regex.test(str);
    }
    hasListPattern(str: string): boolean {
        // Regular expression to match List< or List<List<
        const regex = /List<(?:List<)?/;
        // Test the string against the regex
        return regex.test(str);
    }

    extractJavaWrapperClass(listType: string): string {
        // Regular expression to match the innermost type inside List<>
        const regex = /List<([^>]+)>/;
        let match = listType.match(regex);
    
        // While the match is a nested List, keep extracting the innermost type
        while (match && match[1].startsWith('List<')) {
            match = match[1].match(regex);
        }
    
        // Return the innermost type
        return match ? match[1] : listType;
    }

    getBoilerplateCode(languageId: number){
        switch(languageId){
            case 62:
                return this.generateJava();
            case 71:
                // return pythonFullCode();
            case 74:
                // return typescriptFullCode();
            case 63:
                // return javascriptFullCode();
            case 10:
                // return cppFullCode()
            default: return '';
        }
    }
}

