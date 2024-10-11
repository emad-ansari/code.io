import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { LoginPage } from "./client/pages/LoginPage";
import { SignupPage } from "./client/pages/SignupPage";
import { EmailAuthenticaiton } from "./client/pages/EmailAuthenticaiton";
import { ContestPage } from "./client/pages/ContestPage";
import { StandingPage } from "./client/pages/StandingPage";
import { ProblemSubmissions } from "./client/components/common/ProblemSubmissions";
import { Contribution } from "./client/pages/Contribution";
import { TestCaseForm } from "./client/pages/TestCaseForm";
import { ProblemForm } from "./client/pages/ProblemForm";
import { ProblemNavBar } from "./client/components/common/ProblemNavBar";
import "./index.css";
import { useEffect } from "react";
import { rehydrateAuth } from "./client/features/authSlice";
import { useAppDispatch } from "./client/app/store";

const HomePage = lazy(() => import("./client/pages/HomePage"))
const ProblemStatement = lazy(() => wait(2000).then(() => import("./client/components/common/ProblemStatement")))
const ProblemsetPage = lazy(() => import( "./client/pages/ProblemsetPage"))
const ProblemList = lazy(() => wait(2000).then(() => import("./client/components/common/ProblemList")));
const ProblemDescriptionPage = lazy(() => import ( "./client/pages/ProblemDescriptionPage"))

const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		// On app load, rehydrate the login state
		dispatch(rehydrateAuth());
	}, [dispatch]);

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
					<Route path="/contribution" element={<Contribution />}>
						<Route index element={<ProblemForm />} />
						<Route path="testcase" element={<TestCaseForm />} />
					</Route>
					<Route
						path="problem/:title/"
						element={<ProblemDescriptionPage />}
					>
						<Route
							path="description"
							element={<ProblemStatement />}
						/>

						<Route
							path="submissions"
							element={<ProblemSubmissions />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

function wait (time: number){
	return new Promise(resolve => setTimeout(resolve, time));
}
export default App;
