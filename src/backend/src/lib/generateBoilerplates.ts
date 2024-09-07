import * as fs from 'fs';

class ProblemDetailsParser {
    title: string = "";
    description: string  = "";
    difficulty: string = "";
    functionName: string = "";
    returnType: string =  "";
    inputs: {type: string, name: string, value: string}[] = [];
    output: string = "";
    userId: string =  "";

    
    parseProblemInfo(filePath: string) {
        // read problem details from file and extract the values assign them to respective property
        
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').map(line => line.trim());
        lines.forEach(line => {
            if (line.startsWith('ProblemTitle:')) {
                this.title = line.replace('ProblemTitle:', '').trim();
            } else if (line.startsWith('Description:')) {
                this.description = line.replace('Description:', '').trim();
            } else if (line.startsWith('Difficulty:')) {
                this.difficulty = line.replace('Difficulty:', '').trim();
            } else if (line.startsWith('Function Name:')) {
                this.functionName = line.replace('Function Name:', '').trim();
            } else if (line.startsWith('Parameters:')) {
                // this.parameter = line.replace('Parameters:', '').trim();
            } else if (line.startsWith('Return Type:')) {
                this.returnType = line.replace('Return Type:', '').trim();
            } else if (line.startsWith('User Id:')) {
                this.userId = line.replace('User Id:', '').trim();
            }
            else if (line.startsWith('Inputs:')){
                // extract input over here 

            }
            else if (line.startsWith("Output:")){

            }
        });
    }

    generateJavaBoilerplate(){

        // const javaParameters = this.generateJavaParameters(this.parameters);
        const code = `public class Soution{\n\tpublic ${this.returnType} ${this.functionName}(parameters){\n\t\t}}`

    }

    generateCpp(){

    }

    generateJavascript(){

    }

    getCppReturnType(returnType: string) {
        switch(returnType) {
            case 'int':
                return 'int';
            case 'int[]':
                return 'int[]'
            case 'String' || 'string':
                return 'string';
            case 'Boolean' || 'boolean':
                return 'bool';
            case 'Char' || 'char' : 
                return 'char';
            case 'String[]' || 'string[]':
                return 'string[]';
            case 'List<Integer>': 
                return 'vector<int>'
            case 'List<List<Integer>>' || 'int[][]':
                return 'vector<vector<int>>';
            default: return '';
        }
    }

    getTypeScriptReturnType(returnType: string){
        switch(returnType) {
            case 'int':
                return 'number';
            case 'int[]' || 'List<Integer>':
                return 'number[]'
            case 'String' || 'string':
                return 'string';
            case 'Boolean' || 'boolean':
                return 'boolean';
            case 'String[]' || 'string[]':
                return 'string[]';
            case 'List<List<Integer>>' || 'int[][]':
                return 'number[][]';
            default: return 'number';
        }
    }

    generateJavaParameters(parameters: string){

    }
    
    getCppParameter(){

    }


}
