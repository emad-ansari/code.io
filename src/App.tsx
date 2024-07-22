import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./client/pages/HomePage";
import { LoginPage } from "./client/pages/LoginPage";
import { SignupPage } from "./client/pages/SignupPage";
import { EmailAuthenticaiton } from "./client/pages/EmailAuthenticaiton";
import { ProblemsetPage } from "./client/pages/ProblemsetPage";
import { ContestPage } from "./client/pages/ContestPage";
import { StandingPage } from "./client/pages/StandingPage";
import { Editor } from "./client/pages/Editor";
import { ProblemLayout } from "./client/components/ProblemsLayout";
import "./index.css"; 

const  App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element = {<HomePage />}/>
          <Route path = "/login" element = {<LoginPage />}/> 
          <Route path = '/signup' element = {<SignupPage/>}/>
          <Route path = '/verify-email' element = {<EmailAuthenticaiton/>} />
          <Route path = '/problemset' element= {<ProblemLayout />} >
            <Route index element = {<ProblemsetPage/> }  />
            <Route path = ':problem-name' element= {<Editor />} />
          </Route>
          
          <Route path = '/contests' element= {<ContestPage />} />
          <Route path = '/standings' element= {<StandingPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
