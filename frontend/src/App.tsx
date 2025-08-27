import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { ProblemSubmissions } from "@/components/common/ProblemSubmissions";
import { ProblemChallenges } from "@/pages/ProblemChallenges";
import { MainLayout } from "@/layouts/MainLayout";
import { LoadingPage } from "@/pages/LoadingPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProblemCategoryPage } from "@/pages/admin/ProblemCategoryPage";
import { DocumentPage } from "@/pages/DocumentPage";
import { CSFundamentals } from "@/pages/CSFundamentals";

import { rehydrateAuth } from "@/features/authSlice";
import { useAppDispatch } from "@/app/store";
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from "lucide-react";


const HomePage = lazy(() => import("@/pages/HomePage"));
const ProblemStatement = lazy(() =>
	wait(2000).then(() => import("@/components/common/ProblemStatement"))
);
const ProblemsetPage = lazy(() => import("@/pages/ProblemsetPage"));
const ProblemList = lazy(() =>
	wait(2000).then(() => import("@/components/common/ProblemList"))
);
const ProblemDescriptionPage = lazy(
	() => import("@/pages/ProblemDescriptionPage")
);

const AdminDashboardPage = lazy(() => import("@/pages/admin/DashboardPage"));
const ProblemsPage = lazy(() => import("@/pages/admin/ProblemsPage"));
const UserPage = lazy(() => import("@/pages/admin/UserPage"));
const TestcasesPage = lazy(() => import("@/pages/admin/TestcasesPage"));
const ProblemForm = lazy(() => import("@/pages/admin/New-Problem-Page"));

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
					icon={({ type }) => {
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
								path="me/:username"
								element={<ProfilePage />}
							/>
							<Route
								path="/documents"
								element={<DocumentPage />}
							/>
							<Route
								path="/core-cs"
								element={<CSFundamentals />}
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
