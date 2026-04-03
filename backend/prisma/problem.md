
You are given a **0-indexed** integer array `nums` of even length consisting of an **equal number of positive and negative integers**.

You should return the array of `nums` such that it follows these conditions:

1. Every consecutive pair of integers has **opposite signs**.  
2. For all integers with the same sign, the **relative order** in which they were present in `nums` is preserved.  
3. The rearranged array begins with a **positive integer**.  

Return the modified array after rearranging the elements to satisfy the above conditions.

#### Example 1
```
Input: nums = [3 1 -2 -5 2 -4]
Output: [3,-2,1,-5,2,-4]   
```

#### Example 2
```
Input: [-1,1]
Output: [1, -1]
```


#### Constraints
- `2 <= nums.length <= 2 * 10^5`  
- `nums.length` is **even**  
- `1 <= |nums[i]| <= 10^5`  
- `nums` consists of equal number of positive and negative integers.
- It is not required to do the modifications in-place.