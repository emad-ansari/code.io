import * as fs from 'fs';

class ProblemDetailsParser {
    title: string = "";
    description: string  = "";
    difficulty: string = "";
    functionName: string = "";
    parameters: string = "";
    returnType: string =  "";

    userId: string =  "";
    
    parseInput(filePath: string) {
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
                this.parameters = line.replace('Parameters:', '').trim();
            } else if (line.startsWith('Return Type:')) {
                this.returnType = line.replace('Return Type:', '').trim();
            } else if (line.startsWith('User Id:')) {
                this.userId = line.replace('User Id:', '').trim();
            }
        });




    }

    generateJava(){

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


}
