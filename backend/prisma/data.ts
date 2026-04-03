export const templates = [
  {
    language: "java",
    boiler_code: `class Solution {
    public int[] rearrangeArray(int[] nums) {
        
    }
}
`,
    full_template: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine().trim();
        int[] nums;
        if (line.isEmpty()) {
            nums = new int[0];
        } else {
            String[] parts = line.split(" ");
            nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) {
                nums[i] = Integer.parseInt(parts[i]);
            }
        }

        Solution solution = new Solution();
        int[] result = solution.rearrangeArray(nums);

        for (int i = 0; i < result.length; i++) {
            System.out.print(result[i]);
            if (i < result.length - 1) System.out.print(" ");
        }
        System.out.println();
    }
}
__USER_CODE_HERE__
`,
  },
  {
    language: "cpp",
    boiler_code: `class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        
    }
};`,
    full_template: `#include <bits/stdc++.h>
using namespace std;
__USER_CODE_HERE__
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string line;
    getline(cin, line);
    vector<int> nums;
    if (!line.empty()) {
        stringstream ss(line);
        int num;
        while (ss >> num) {
            nums.push_back(num);
        }
    }

    Solution solution;
    vector<int> result = solution.rearrangeArray(nums);

    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
  {
    language: "python",
    boiler_code: `class Solution:
    def rearrangeArray(self, nums: list[int]) -> list[int]:
        `,
    full_template: `__USER_CODE_HERE__
if __name__ == "__main__":
    import sys
    line = sys.stdin.readline().strip()
    nums = list(map(int, line.split())) if line else []
    solution = Solution()
    result = solution.rearrangeArray(nums)
    print(" ".join(map(str, result)))`,
  },
];





const testcases = [
  { input: "3 1 -2 -5 2 -4", expected_output: "3 -2 1 -5 2 -4", isSample: true },
  { input: "-1 1", expected_output: "1 -1", isSample: true },
  { input: "1 -1 2 -2", expected_output: "1 -1 2 -2", isSample: true },
  { input: "5 -3 6 -7", expected_output: "5 -3 6 -7", isSample: false },
  { input: "10 -1 -2 20", expected_output: "10 -1 20 -2", isSample: false },
  { input: "1 2 3 -1 -2 -3", expected_output: "1 -1 2 -2 3 -3", isSample: false },
  { input: "100 -5 200 -10", expected_output: "100 -5 200 -10", isSample: false }, 
  { input: "-4 -2 2 4", expected_output: "2 -4 4 -2", isSample: false }, 
  { input: "-9 -7 -5 1 3 5", expected_output: "1 -9 3 -7 5 -5", isSample: false }, 
  { input: "50 -10 40 -20 30 -30", expected_output: "50 -10 40 -20 30 -30", isSample: false } 
];



export const problems = [
	{
		problemCategory: "array",
		problemTitle: "Rearrange Array Elements by Sign",
		description: ``,
		difficulty: "Medium",
		tags: ["Array", "Two Pointers"],
		testcases: testcases,
		templates: templates,
	},
];
