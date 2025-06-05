import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { LoginPage } from "@/client/pages/LoginPage";
import { SignupPage } from "@/client/pages/SignupPage";
import { EmailAuthenticaiton } from "@/client/pages/EmailAuthenticaiton";
import { ContestPage } from "@/client/pages/ContestPage";
import { StandingPage } from "@/client/pages/StandingPage";
import { ProblemSubmissions } from "@/client/components/common/ProblemSubmissions";


import { ProblemNavBar } from "@/client/components/common/ProblemNavBar";
import { LoadingPage } from "@/client/pages/LoadingPage";

import { rehydrateAuth } from "@/client/features/authSlice";
import { useAppDispatch } from "@/client/app/store";

const HomePage = lazy(() => import("@/client/pages/HomePage"));
const ProblemStatement = lazy(() =>
	wait(2000).then(() => import("@/client/components/common/ProblemStatement"))
);
const ProblemsetPage = lazy(() => import("@/client/pages/ProblemsetPage"));
const ProblemList = lazy(() =>
	wait(2000).then(() => import("@/client/components/common/ProblemList"))
);
const ProblemDescriptionPage = lazy(
	() => import("@/client/pages/ProblemDescriptionPage")
);

const AdminDashboardPage = lazy(
	() => import("@/client/pages/admin/DashboardPage")
);
const ProblemsPage = lazy(() => import("@/client/pages/admin/ProblemsPage"));
const UserPage = lazy(() => import("@/client/pages/admin/UserPage"));
const TestcasesPage = lazy(() => import("@/client/pages/admin/TestcasesPage"));
const ProblemForm = lazy(() => import("@/client/pages/ProblemForm"));

const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		// On app load, rehydrate the login state
		dispatch(rehydrateAuth());
	}, [dispatch]);

	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<LoadingPage />}>
					{/* <ToastContainer
						position="top-center"
						autoClose={4000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
						aria-label={2}
						// transition: Bounce
					/> */}
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
						<Route
							path="admin/dashboard"
							element={<AdminDashboardPage />}
						>
							<Route index path="users" element={<UserPage />} />
							<Route
								path="problems"
								element={<ProblemsPage />}
							></Route>
							<Route
								path="new-problem"
								element={<ProblemForm />}
							/>
							<Route
								path="testcases"
								element={<TestcasesPage />}
							/>
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
};

function wait(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
export default App;
