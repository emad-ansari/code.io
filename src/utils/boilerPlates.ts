// Java script
export const javascriptBoilerPlate = `function twoSum(a, b){\n\treturn a + b; \n}`;

// Java
const returnType = "int";
const functionName = "claculateSum";
const parameters = "int[] nums";
export const javaBoilerPlate = `public class Main{\n\tpublic ${returnType} ${functionName}(${parameters}){\n\t\t//write your code here.\n\t}\n}`;

`import java.util.Arrays;public class Main{public static void main(String[] args){reverseArray(nums);System.out.print(Arrays.toString(nums));}public static void reverseArray(int[] nums){int s= 0;int e = nums.length - 1;while(s <= e){int temp = nums[s];nums[s] = nums[e];nums[e]  = temp;s++;e--;}}}`

/*
    - it become clear that i have to save the expected ouput in the form [1,2, 3, 4] if it is an array
    - don't use stdin to provide input
    - 

*/

