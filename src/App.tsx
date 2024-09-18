import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./client/pages/HomePage";
import { LoginPage } from "./client/pages/LoginPage";
import { SignupPage } from "./client/pages/SignupPage";
import { EmailAuthenticaiton } from "./client/pages/EmailAuthenticaiton";
import { ProblemsetPage } from "./client/pages/ProblemsetPage";
import { ContestPage } from "./client/pages/ContestPage";
import { StandingPage } from "./client/pages/StandingPage";
import { ProblemDescriptionPage } from "./client/pages/ProblemDescriptionPage";
import { ProblemList } from "./client/components/common/ProblemList";
import { AboutUs } from "./client/pages/AboutUsPage";
import { ProblemStatement }  from "./client/components/common/ProblemDescription";
import { ProblemSubmissions }  from "./client/components/common/ProblemSubmissions";
import { Contribution } from "./client/pages/Contribution";
import { TestCaseForm } from "./client/pages/TestCaseForm";
import { ProblemForm } from "./client/pages/ProblemForm";
import { ProblemNavBar } from "./client/components/common/ProblemNavBar";
import "./index.css";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<ProblemNavBar isProbleDescriptioPage={false} />
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route
						path="/verify-email"
						element={<EmailAuthenticaiton />}
					/>
					<Route path="/problemset" element={<ProblemsetPage />}>
						<Route index element={<ProblemList />} />
					</Route>
					<Route path="/contests" element={<ContestPage />} />
					<Route path="/standings" element={<StandingPage />} />
					<Route path="/contribution" element={<Contribution />} >
						<Route index  element = {<ProblemForm />} />
						<Route path = 'testcase' element = {<TestCaseForm />} />
					</Route>
					<Route path="problem/:problem-name/" element={<ProblemDescriptionPage />}>
						<Route  path = 'description' element={<ProblemStatement />} />
						<Route  path = 'submissions' element={< ProblemSubmissions />} />	
					</Route>
					<Route path="/about-us" element={<AboutUs />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
