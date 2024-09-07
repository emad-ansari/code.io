import { TestCase, ParseProblemDetails } from ".";


class GenerateFullProblemDefinition {
    functionName: string = "";
    inputs: {type: string, name: string, value: string}[] = [];
    output: { type: string, value: string } ={type: '', value: ''} ;

    parseTestCase(testcase: TestCase){


    }

    getProblem(){

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

        const inputRead = this.inputs.map(input => {
            if(this.hasSquareBrackets(input.type)){
                // if input type => array  or matrix 
                let value = input.value.replace('[', '{');
                value = value.replace(']', '}');
                return `${input.type} ${input.name} = ${value};`
            }
            else if (this.hasListPattern(input.type)){
                let value = input.value.replace('[', '{');
                value = value.replace(']', '}');
                return `${input.type} ${input.name} = new ArrayList<>()`
            }
        }).join('\n');


        return `
        import java.util.*;
        import java.io.*;

        public class Main {
            public static void main(String[] args){
                int[] nums =  {1, 2, 3, 4};
                int target = 9;
                List<Integer> nums = new ArrayList<>(extractValue)
                ${inputRead}

                int[] result = twoSum(nums, target)
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
}

// int[] nums = 1, 2, 3, 4

// int[][] nums = 1, 2, 3, 4
//                5, 6, 7, 8
//                9, 10, 11, 12

// int[][] nums = [[1, 2, 3], [4]]