import { TestCaseInput, TestCaseOutput } from "../@utils/types";

type TypeMapDefinition = {
	[key: string]: string;
};

// TypeDefinitions.js
class TypeDefinitions {
	static templates: { [key: string]: string } = {
		ListNode: `
            struct ListNode {
                int val;
                ListNode *next;
                ListNode() : val(0), next(nullptr) {}
                ListNode(int x) : val(x), next(nullptr) {}
                ListNode(int x, ListNode *next) : val(x), next(next) {}
            };`,
		TreeNode: `
            struct TreeNode {
                int val;
                TreeNode *left;
                TreeNode *right;
                TreeNode() : val(0), left(nullptr), right(nullptr) {}
                TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
                TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
            };`,
	};

	static helperFunctions: { [key: string]: string } = {
		ListNode: `
            ListNode* parseLinkedList(string input) {
                // Remove brackets and split by comma
                input = input.substr(1, input.length() - 2);
                if (input.empty()) return nullptr;
                
                stringstream ss(input);
                string val;
                ListNode* dummy = new ListNode(0);
                ListNode* curr = dummy;
                
                while (getline(ss, val, ',')) {
                    curr->next = new ListNode(stoi(val));
                    curr = curr->next;
                }
                return dummy->next;
            }
            
            void printLinkedList(ListNode* head) {
                cout << "[";
                while (head) {
                    cout << head->val;
                    if (head->next) cout << ",";
                    head = head->next;
                }
                cout << "]";
            }`,
		TreeNode: `
            TreeNode* parseTreeNode(string input) {
                // Remove brackets
                input = input.substr(1, input.length() - 2);
                if (input.empty()) return nullptr;
                
                stringstream ss(input);
                string val;
                vector<string> values;
                while (getline(ss, val, ',')) values.push_back(val);
                
                if (values.empty() || values[0] == "null") return nullptr;
                
                TreeNode* root = new TreeNode(stoi(values[0]));
                queue<TreeNode*> q{{root}};
                int i = 1;
                
                while (!q.empty() && i < values.size()) {
                    TreeNode* node = q.front();
                    q.pop();
                    
                    if (i < values.size() && values[i] != "null") {
                        node->left = new TreeNode(stoi(values[i]));
                        q.push(node->left);
                    }
                    i++;
                    
                    if (i < values.size() && values[i] != "null") {
                        node->right = new TreeNode(stoi(values[i]));
                        q.push(node->right);
                    }
                    i++;
                }
                return root;
            }
            
            void printTreeNode(TreeNode* root) {
                if (!root) {
                    cout << "[]";
                    return;
                }
                
                cout << "[";
                queue<TreeNode*> q{{root}};
                bool first = true;
                
                while (!q.empty()) {
                    int size = q.size();
                    bool allNull = true;
                    vector<TreeNode*> level;
                    
                    for (int i = 0; i < size; i++) {
                        TreeNode* node = q.front();
                        q.pop();
                        level.push_back(node);
                        
                        if (node) {
                            allNull = false;
                            q.push(node->left);
                            q.push(node->right);
                        }
                    }
                    
                    if (allNull) break;
                    
                    for (TreeNode* node : level) {
                        if (!first) cout << ",";
                        first = false;
                        
                        if (node) cout << node->val;
                        else cout << "null";
                    }
                }
                cout << "]";
            }`,
	};
}

// TypeMapper.js
class TypeMapper {
	static typeMap: TypeMapDefinition = {
		// Basic types
		int: "int",
		long: "long long",
		string: "string",
		char: "char",
		bool: "bool",
		double: "double",

		// Array/Vector types
		"int[]": "vector<int>",
		"string[]": "vector<string>",
		"char[]": "vector<char>",
		"int[][]": "vector<vector<int>>",

		// Special types
		ListNode: "ListNode*",
		TreeNode: "TreeNode*",

		// Collection types
		"List<Integer>": "vector<int>",
		"List<String>": "vector<string>",
		"Set<Integer>": "set<int>",
		"Map<Integer,Integer>": "map<int,int>",
	};

	static getCppType(javaType: string): string {
		return this.typeMap[javaType] || javaType;
	}
}

// InputParser.js
class InputParser {
	static getInputParser(type: string, name: string): string {
		const cppType = TypeMapper.getCppType(type);

		if (cppType === "ListNode*") {
			return `string ${name}_str;
                   getline(cin, ${name}_str);
                   ListNode* ${name} = parseLinkedList(${name}_str);`;
		}

		if (cppType === "TreeNode*") {
			return `string ${name}_str;
                   getline(cin, ${name}_str);
                   TreeNode* ${name} = parseTreeNode(${name}_str);`;
		}

		if (cppType.startsWith("vector<vector<")) {
			return this.parse2DVector(cppType, name);
		}

		if (cppType.startsWith("vector<")) {
			return this.parseVector(cppType, name);
		}

		return this.parseBasicType(cppType, name);
	}

	static parseBasicType(type: string, name: string): string {
		return `${type} ${name};
                ${
					type === "string"
						? "getline(cin, " + name + ");"
						: "cin >> " + name + ";"
				}`;
	}

	static parseVector(type: string, name: string): string {
		return `${type} ${name};
                string line;
                getline(cin, line);
                stringstream ss(line.substr(1, line.length() - 2));
                string element;
                while (getline(ss, element, ',')) {
                    ${name}.push_back(${this.getParseExpression(
			type,
			"element"
		)});
                }`;
	}

	static parse2DVector(type: string, name: string): string {
		return `${type} ${name};
                string line;
                getline(cin, line);
                line = line.substr(1, line.length() - 2);
                stringstream ss(line);
                string row;
                while (getline(ss, row, ']')) {
                    if (row.empty() || row == "[" || row == ";[") continue;
                    if (row[0] == ',' || row[0] == ';') row = row.substr(2);
                    else if (row[0] == '[') row = row.substr(1);
                    
                    stringstream rowss(row);
                    ${type.slice(7, -1)} inner;
                    string element;
                    while (getline(rowss, element, ',')) {
                        inner.push_back(${this.getParseExpression(
							type,
							"element"
						)});
                    }
                    ${name}.push_back(inner);
                }`;
	}

	static getParseExpression(type: string, element: string): string {
		if (type.includes("string>")) return element;
		if (type.includes("char>")) return `${element}[0]`;
		if (type.includes("bool>"))
			return `(${element} == "true" || ${element} == "1")`;
		return `stoi(${element})`;
	}
}

// OutputFormatter.js
class OutputFormatter {
	static getOutputFormatter(
		type: string,
		varName: string = "result"
	): string {
		const cppType = TypeMapper.getCppType(type);

		if (cppType === "ListNode*") {
			return `printLinkedList(${varName});`;
		}

		if (cppType === "TreeNode*") {
			return `printTreeNode(${varName});`;
		}

		if (cppType.startsWith("vector<vector<")) {
			return this.format2DVector(varName);
		}

		if (cppType.startsWith("vector<")) {
			return this.formatVector(varName);
		}

		return `cout << ${varName};`;
	}

	static formatVector(varName: string): string {
		return `cout << "[";
                for(int i = 0; i < ${varName}.size(); i++) {
                    if(i > 0) cout << ",";
                    cout << ${varName}[i];
                }
                cout << "]";`;
	}

	static format2DVector(varName: string): string {
		return `cout << "[";
                for(int i = 0; i < ${varName}.size(); i++) {
                    if(i > 0) cout << ",";
                    cout << "[";
                    for(int j = 0; j < ${varName}[i].size(); j++) {
                        if(j > 0) cout << ",";
                        cout << ${varName}[i][j];
                    }
                    cout << "]";
                }
                cout << "]";`;
	}
}

// CodeGenerator.js
class CppCodeGenerator {
	private functionName: string;
	private inputs: TestCaseInput[];
	private output: TestCaseOutput;

	constructor(functionName: string, inputs: TestCaseInput[], output: TestCaseOutput) {
		this.functionName = functionName;
		this.inputs = inputs || [];
		this.output = output || { type: "void", value: "" };
	}

	generateCode(): string {
		const neededTypes = new Set<string>();
		this.inputs.forEach((input) => {
			if (["ListNode", "TreeNode"].includes(input.type)) {
				neededTypes.add(input.type);
			}
		});
		if (["ListNode", "TreeNode"].includes(this.output.type)) {
			neededTypes.add(this.output.type);
		}

		const headers = this.generateHeaders();
		const structures = this.generateStructures(neededTypes);
		const helpers = this.generateHelpers(neededTypes);
		const mainFunction = this.generateMainFunction();

		return `${headers}
            using namespace std;
            
            ${structures}
            ${helpers}
            
            __USER_CODE_HERE__
            
            ${mainFunction}`;
	}

	private generateHeaders(): string {
		return `#include <iostream>
            #include <vector>
            #include <string>
            #include <sstream>
            #include <queue>
            #include <map>
            #include <set>
            #include <algorithm>`;
	}

	private generateStructures(neededTypes: Set<string>): string {
		return Array.from(neededTypes)
			.map((type) => TypeDefinitions.templates[type])
			.join("\n");
	}

	private generateHelpers(neededTypes: Set<string>): string {
		return Array.from(neededTypes)
			.map((type) => TypeDefinitions.helperFunctions[type])
			.join("\n");
	}

	private generateMainFunction(): string {
		const args = this.inputs.map((input) => input.name).join(", ");
		const inputParsing = this.inputs
			.map((input) => InputParser.getInputParser(input.type, input.name))
			.join("\n");

		const functionCall =
			this.output.type === "void"
				? `${this.functionName}(${args});`
				: `auto result = ${this.functionName}(${args});`;

		const outputHandling =
			this.output.type === "void"
				? ""
				: OutputFormatter.getOutputFormatter(this.output.type);

		return `int main() {
                ios_base::sync_with_stdio(false);
                cin.tie(NULL);
                
                ${inputParsing}
                ${functionCall}
                ${outputHandling}
                
                return 0;
            }`;
	}
}

// Export all classes
export {
	TypeDefinitions,
	TypeMapper,
	InputParser,
	OutputFormatter,
	CppCodeGenerator,
};
