import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "../app/store";
import { setLogout, refreshToken } from "../features/authSlice";


export const api = axios.create({
	baseURL: "http://localhost:3000/api",
	// timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

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
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};
		if (error.response?.status === 401 && !originalRequest?._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["authorization"] =
							"Bearer " + token;
						return api(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			return new Promise((resolve, reject) => {
				store
					.dispatch(refreshToken())
					.unwrap()
					.then(( {message, accessToken }) => {
            console.log('message in promise: ', message);
						originalRequest.headers["authorization"] =
							"Bearer " + accessToken;
						processQueue(null, accessToken);
						resolve(api(originalRequest));
					})
					.catch((err: any) => {
						processQueue(err, null);
						store.dispatch(setLogout());
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(error);
	}
);

export default api;
