import { TestCaseReturnType } from "../@utils/types";



export class GenerateFullProblemDefinition {
    functionName: string = "";
    inputs: {type: string, name: string, value: string}[] = [];
    output: { type: string, value: string } = {type: '', value: ''} ;

    parseTestCase(testcase: TestCaseReturnType){
        this.inputs = testcase.inputs;
        this.output = testcase.output !== null ? testcase.output : { type: "", value: ""};
        const title = testcase.title !== null ? testcase.title.replaceAll(" ", "").trim() : "";
        this.functionName = title.charAt(0).toLowerCase() + title.slice(1);
    }

    getProblem(languageId: number, code: string):{ fullBoilerplatecode: string, stdin: string, stdout: string }{
        
        const fullBoilerplatecode: string =  this.getBoilerplateCode(languageId);
        const stdin = this.inputs.map(input => {
            const stdInput = `${input.value.replace(/[\[\],\s]+/g, ' ')}`;
            return stdInput.replace(",", "");

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
            functionCall = `${this.functionName}(${argument});`
        }
        else {
            functionCall = `${this.output.type} result =  ${this.functionName}(${argument});`
            outputWrite = "System.out.print(result);"
        }

        const inputRead = `
        Scanner scanner = new Scanner(System.in);
        ${this.inputs.map(input => {
            let javaType = this.extractJavaWrapperClass(input.type);

            if (this.hasSquareBrackets(input.type)) {


                if (input.type.includes('[][]')) {
                    // 2D Arrays
                    if (input.type.startsWith('int')) {
                        return `int[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> Arrays.stream(line.split(" ")).mapToInt(Integer::parseInt).toArray()).toArray(int[][]::new);`;
                    } else if (input.type.startsWith('boolean')) {
                        return `boolean[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> Arrays.stream(line.split(" ")).map(Boolean::parseBoolean).toArray()).toArray(boolean[][]::new);`;
                    } else if (input.type.startsWith('char')) {
                        return `char[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> line.replace(" ", "").toCharArray()).toArray(char[][]::new);`;
                    } else {
                        return `String[][] ${input.name} = Arrays.stream(scanner.nextLine().split(";")).map(line -> line.split(" ")).toArray(String[][]::new);`;
                    }
                }
                else {
                    // 1D Arrays
                    if (input.type.startsWith('int')) {
                        return `int[] ${input.name} = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();`;
                    } else if (input.type.startsWith('boolean')) {
                        return `boolean[] ${input.name} = Arrays.stream(scanner.nextLine().split(" ")).map(Boolean::parseBoolean).toArray();`;
                    } else if (input.type.startsWith('char')) {
                        return `char[] ${input.name} = scanner.nextLine().replace(" ", "").toCharArray();`;
                    } else {
                        return `String[] ${input.name} = scanner.nextLine().split(" ");`;
                    }
                }
               
            } else if (this.hasListPattern(input.type)) {
                
                let parseFunction = this.getParseFunctionForList(javaType);

                if (input.type.startsWith('List<List<')) {
                    // List of Lists
                    return `List<List<${javaType}>> ${input.name} = new ArrayList<>();
                            String[] lines = scanner.nextLine().split(";");
                            for (String line : lines) {
                                List<${javaType}> innerList = Arrays.stream(line.split(" "))
                                                                  .map(${parseFunction})
                                                                  .collect(Collectors.toList());
                                ${input.name}.add(innerList);
                            }`;
                } else {
                    // Single List
                    return `List<${javaType}> ${input.name} = new ArrayList<>();
                            Arrays.stream(scanner.nextLine().split(" "))
                                  .map(${parseFunction})
                                  .forEach(${input.name}::add);`;
                }
            } else {
                // Handle simple types
                return `${input.type} ${input.name} = scanner.${this.getScannerMethod(input.type)};`;
            }
        }).join('\n')}`;

        return `
        import java.util.*;
        import java.io.*;
        import java.util.stream.Collectors;

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
    getParseFunctionForList(type: string) {
        if (type === 'Integer') return 'Integer::parseInt';
        if (type === 'Boolean') return 'Boolean::parseBoolean';
        if (type === 'Character') return 's -> s.charAt(0)';
        return 's -> s'; // Default to String
    }
    getScannerMethod(type: string) {
        if (type === 'int') return 'nextInt()';
        if (type === 'boolean') return 'nextBoolean()';
        if (type === 'char') return 'next().charAt(0)';
        return 'next()'; // Default to String
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

// 
/*
int target = input.value
- ['a', 'b', 'c', 'd'] 
- String[] stream = {1, 2, 3, 4};
- String[] stream = {}
- List<Integer> nums = new ArrayList<>();
for (char value: stream){
    //get the right type of input here and convert the string '1' to right type

    nums.add(value);
}


For 1D array => 
Input.value: [1, 2, 3, 4] <- Number

Input.value = ['a', 'b', 'c']
    


*/