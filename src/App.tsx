import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./client/pages/HomePage";
import { LoginPage } from "./client/pages/LoginPage";
import { SignupPage } from "./client/pages/SignupPage";
import { EmailAuthenticaiton } from "./client/pages/EmailAuthenticaiton";
import { ProblemsetPage } from "./client/pages/ProblemsetPage";
import { ContestPage } from "./client/pages/ContestPage";
import { StandingPage } from "./client/pages/StandingPage";
import { ProblemDescriptionPage } from "./client/pages/ProblemDescriptionPage";
import { ProblemList } from "./client/components/ProblemList";
import { AboutUs } from "./client/pages/AboutUsPage";
import { Layout } from "./client/layouts/Layout";
import { ProblemStatementPageLayOut } from "./client/layouts/ProblemStatementPageLayOut";

import "./index.css";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route
						path="/verify-email"
						element={<EmailAuthenticaiton />}
					/>
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/p" element={<Layout />}>
						<Route path="problemset" element={<ProblemsetPage />}>
							<Route index element={<ProblemList />} />
						</Route>
						<Route path="contests" element={<ContestPage />} />
						<Route path="standings" element={<StandingPage />} />
					</Route>
					<Route
						path="problem/:problem-name"
						element={<ProblemStatementPageLayOut />}
					>
						<Route index element={<ProblemDescriptionPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
