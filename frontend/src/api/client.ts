import axios from "axios";
import { logOut } from "../features/authSlice";
import { APIResponse } from "../lib/types";
import { store } from "../app/store";

const API_BASE = import.meta.env.VITE_API_URL;

export const api = axios.create({
	baseURL: API_BASE,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("CToken");
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
		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
			try {
				const response = await api.post<
					APIResponse<{ accessToken: string }>
				>(
					`${API_BASE}/api/user/refresh-token`,
					{},
					{
						withCredentials: true,
					}
				);
				const { success, data, msg } = response.data;
				console.log(msg);
				// Store the new access.
				if (success && data) {
					localStorage.setItem("CToken", data.accessToken!);
					// Update the authorization header with the new access token.
					api.defaults.headers.common[
						"authorization"
					] = `Bearer ${data.accessToken}`;
					return api(originalRequest); // Retry the original request with the new access token.
				}
			} catch (refreshError) {
				// Handle refresh token errors by clearing stored tokens and redirecting to the login page.
				console.error("Token refresh failed:", refreshError);
				localStorage.removeItem("CToken");
				// logout the user if
				store.dispatch(logOut()); // to remove the refresh token from http  only cookie.
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error); // For all other errors, return the error as is.
	}
);

export default api;
