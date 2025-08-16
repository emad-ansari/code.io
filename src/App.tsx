import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { LoginPage } from "@/client/pages/LoginPage";
import { SignupPage } from "@/client/pages/SignupPage";
import { ProblemSubmissions } from "@/client/components/common/ProblemSubmissions";
import { ProblemChallenges } from "@/client/pages/ProblemChallenges";
import { MainLayout } from "@/client/layouts/MainLayout";
import { LoadingPage } from "@/client/pages/LoadingPage";
import { ProfilePage } from "@/client/pages/ProfilePage";
import { ProblemCategoryPage } from "./client/pages/admin/ProblemCategoryPage";

import { rehydrateAuth } from "@/client/features/authSlice";
import { useAppDispatch } from "@/client/app/store";
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from "lucide-react";

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
const ProblemForm = lazy(() => import("@/client/pages/admin/New-Problem-Page"));

const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		// On app load, rehydrate the login state
		dispatch(rehydrateAuth());
	}, [dispatch]);

	return (
		<>
			<BrowserRouter>
				<ToastContainer
					position="top-center"
					autoClose={4000}
					icon={({ type, theme }) => {
						switch (type) {
							case "info":
								return <Info className="stroke-indigo-400" />;
							case "error":
								return (
									<CircleAlert className="stroke-red-500" />
								);
							case "success":
								return (
									<BadgeCheck className="stroke-green-500" />
								);
							case "warning":
								return (
									<TriangleAlert className="stroke-yellow-500" />
								);
							default:
								return null;
						}
					}}
				/>
				<Suspense fallback={<LoadingPage />}>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<HomePage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/problemset">
								<Route index element={<ProblemChallenges />} />
								<Route
									path=":category"
									element={<ProblemsetPage />}
								>
									<Route index element={<ProblemList />} />
								</Route>
								<Route
									path=":category/:problemId/"
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
							</Route>
							<Route
								path="u/:user-name"
								element={<ProfilePage />}
							/>
						</Route>
						<Route
							path="admin/dashboard"
							element={<AdminDashboardPage />}
						>
							<Route path="users" element={<UserPage />} />
							<Route
								path="problems"
								element={<ProblemsPage />}
							></Route>
							<Route
								path="new-problem"
								element={<ProblemForm />}
							/>
							<Route
								path="category"
								element={<ProblemCategoryPage />}
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
