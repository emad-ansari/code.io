


export const templates = [
	{
		language: "java",
		boiler_code: `class Solution {
    public int reverse(int x) {

    }
}
`,
		full_template: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int num = Integer.parseInt(br.readLine());

        Solution solution = new Solution();
        int result = solution.reverse(num);

        System.out.println(result);
    }
}
__USER_CODE_HERE__
`,
	},
	{
		language: "cpp",
		boiler_code: `class Solution {
public:
    int reverse(int x) {
        
    }
};`,
		full_template: `#include <bits/stdc++.h>
using namespace std;
__USER_CODE_HERE__
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int num;
    cin >> num;

    Solution solution;
    int result = solution.reverse(num);

    cout << result << "\\n";

    return 0;
}
`,
	},
	{
		language: "python",
		boiler_code: `class Solution:
    def reverse(self, x: int) -> int:
        `,
		full_template: `__USER_CODE_HERE__
if __name__ == "__main__":
    num = int(input().strip())
    solution = Solution()
    result = solution.reverse(num)
    print(result)`,
	},
];


const testcases = [
    { input: "123", expected_output: "321", isSample: true },
    { input: "-123", expected_output: "-321", isSample: true },
    { input: "120", expected_output: "21", isSample: true },
    { input: "0", expected_output: "0", isSample: false },
    { input: "1534236469", expected_output: "0", isSample: false }, // overflow case
    { input: "-1534236469", expected_output: "0", isSample: false }, // negative overflow
    { input: "1000", expected_output: "1", isSample: false },
    { input: "-100", expected_output: "-1", isSample: false },
    { input: "2147483647", expected_output: "0", isSample: false }, // max int edge
    { input: "-2147483648", expected_output: "0", isSample: false }, // min int edge
];


export const problems = [
	{
		problemCategory: "math",
		problemTitle: "Reverse Integer",
		description: ``,
		difficulty: "Medium",
		tags: ["Math"],
		testcases: testcases,
		templates: templates,
	},
];
