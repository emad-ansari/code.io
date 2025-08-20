
## Todo
  [ ] make challenges page responsive
- [ ] analyze the judge0 to run different code.
- [ ] Store new problem and testcases into database system instead of file system.
- [ ] add tooltip to setting and full screen icon
- [ ] add feature to run cpp code
- [ ] Test CppCodeGenerator library
- [ ] Design user profile page
- [x] Design landing page
- [x] Add functionality to display all applied filter.
- [x] current path should be highlighted

## Completed
- [x] Dsiplay react toast when logut successfully

- [x] correct the implementation of role based authentication

- [x] Add functionality to submit the code

- [x] User written code must persist across  page reloads.

- [x] Fix the bug in loading boiler plate code when navigating on page problem/problemTitle/description

- [x] Fix the problemId bug in runCode function in EditorSection component

- [x] add getJavaScriptBoilerplateCode()

- [x] add condition of void return type in other langauge boilerplate code generation function

- [x] Learn and fix the refresh token problem
    - https://www.saurabhmisra.dev/store-jwt-token-http-only-cookie/
    - https://github.com/axios/axios/issues/4907
    - https://medium.com/@etearner/use-httponly-cookie-to-secure-your-react-app-4e8417d136b8
    - https://www.reddit.com/r/node/comments/hfmvs3/better_understanding_of_axios_handling_of/
    - https://www.dhiwise.com/post/managing-secure-cookies-via-axios-interceptors
    
- [x] fix the bug when usr click on chrome back button to go back -> application get break

- [x] fix the bug in compilation error when executing code.

- [x] add some loader to /problemset page and /problme/problem-title/description page so that clicking back button should render loader rather than nothing for a small amount of time

- [x] fix the active button backgorund color in shadcn pagination component and should also fix next and previous button to work properly
- [x] add filter by search functionality

- [x] add button to set page size.

- [x] After the login, User should automatically redirect to the page where it  was before login

- [x] add logout functionality

- [x] fix the bug in calling getDefualtCode inside useEffect in CodeEditor component 

- [x] change the setting dialog to shadcn ui dialog

- [x] Replace user icon with profile image option in navbar