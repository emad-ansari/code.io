import axios from "axios";
import { logOut } from "../features/authSlice";
import { RefreshTokenApiResponse } from "../types";
import { store } from "../app/store";

export const api = axios.create({
	baseURL: "http://localhost:3000/api",
	// timeout: 10000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("CToken");
		console.log("outgoing token", token);
		if (token) {
			config.headers["authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response, // Directly return successful responses.
	async (error) => {
		const originalRequest = error.config;
		console.log("original request, ", originalRequest);
		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
			try {
				console.log("going to refresh the access token");
				// Make a request to your auth server to refresh the token.

				const response = await api.post<RefreshTokenApiResponse>(
					"http://localhost:3000/api/user/refresh-token",
					{},
					{
						withCredentials: true,
					}
				);
				console.log("refresh token api response ", response.data);

				const { success, message, accessToken } = response.data;

				// Store the new access.
				if (success) {
					localStorage.setItem("CToken", accessToken!);
					// Update the authorization header with the new access token.
					api.defaults.headers.common[
						"authorization"
					] = `Bearer ${accessToken}`;
					return api(originalRequest); // Retry the original request with the new access token.
				}
				console.log("refesh token api response: ", message);
			} catch (refreshError) {
				// Handle refresh token errors by clearing stored tokens and redirecting to the login page.
				console.error("Token refresh failed:", refreshError);
				localStorage.removeItem("CToken");
				// logout the user if
				store.dispatch(logOut()); // to remove the refresh token from http  only cookie.

				//   window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error); // For all other errors, return the error as is.
	}
);

export default api;
