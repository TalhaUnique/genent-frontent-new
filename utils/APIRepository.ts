// "use client";
// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://gennetaialb-792310392.us-east-1.elb.amazonaws.com/api/v1';

// const axiosInstance = axios.create({
//   baseURL,
//   timeout: 10000,
// });

// // Add an interceptor to include authentication headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const isAuthRequest = config.url?.includes('/auth'); // Check if the request is for authentication
//     const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

//     if (!isAuthRequest && token) {
//       config.headers.set("Authorization", `Bearer ${token}`);
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// export default class APIRepository {
//   static async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
//     try {
//       return await axiosInstance.get(endpoint, config);
//     } catch (error) {
//       console.error('GET request failed:', error);
//       throw error;
//     }
//   }

//   static async post<T>(
//     endpoint: string,
//     data: any,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> {
//     try {
//       return await axiosInstance.post(endpoint, data, config);
//     } catch (error) {
//       console.error('POST request failed:', error);
//       throw error;
//     }
//   }

//   static async put<T>(
//     endpoint: string,
//     data: any,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> {
//     try {
//       return await axiosInstance.put(endpoint, data, config);
//     } catch (error) {
//       console.error('PUT request failed:', error);
//       throw error;
//     }
//   }

//   static async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
//     try {
//       return await axiosInstance.delete(endpoint, config);
//     } catch (error) {
//       console.error('DELETE request failed:', error);
//       throw error;
//     }
//   }

//   static async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
//     try {
//       return await axiosInstance.request(config);
//     } catch (error) {
//       console.error('Generic request failed:', error);
//       throw error;
//     }
//   }
// }





























"use client";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiEvents from '@/utils/apiEvents';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://gennetaialb-792310392.us-east-1.elb.amazonaws.com/api/v1';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

// Request interceptor for auth
axiosInstance.interceptors.request.use(
  (config) => {
    const isAuthRequest = config.url?.includes('/auth');
    const token = localStorage.getItem('authToken');
    if (!isAuthRequest && token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Avoid duplicate polling
let isPolling = false;

const startPollingOriginalRequest = (originalConfig: AxiosRequestConfig) => {
  if (isPolling) return;
  isPolling = true;

  apiEvents.emit("serverStarting");

  const poll = async () => {
    try {
      const res = await axiosInstance.request(originalConfig);
      if (res.status === 200) {
        apiEvents.emit("serverReady");
        isPolling = false;
        return;
      }
    } catch (err: any) {
      const status = err?.response?.status;
      const detail = err?.response?.data?.detail || '';

      // If it's not the "server is starting" error, throw it
      if (
        status !== 503 ||
        typeof detail !== 'string' ||
        !detail.toLowerCase().includes("starting")
      ) {
        console.log("HEREEERERERERERERERERERER")
        isPolling = false;
        throw err;
      }

      // Otherwise, keep polling
    }

    setTimeout(poll, 5000);
  };

  poll();
};

const handleError = (error: any, originalConfig: AxiosRequestConfig) => {
  const detail = error.response?.data?.detail;
  if (
    error.response?.status === 503 &&
    typeof detail === "string" &&
    detail.toLowerCase().includes("starting")
  ) {
    startPollingOriginalRequest(originalConfig);
  }
  throw error;
};

export default class APIRepository {
  static async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.get(endpoint, config);
    } catch (error) {
      console.error('GET request failed:', error);
      console.log(endpoint)
      return handleError(error, { ...config, method: 'get', url: endpoint });
    }
  }

  static async post<T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.post(endpoint, data, config);
    } catch (error) {
      console.error('POST request failed:', error);
      return handleError(error, { ...config, method: 'post', url: endpoint, data });
    }
  }

  static async put<T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.put(endpoint, data, config);
    } catch (error) {
      console.error('PUT request failed:', error);
      return handleError(error, { ...config, method: 'put', url: endpoint, data });
    }
  }

  static async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.delete(endpoint, config);
    } catch (error) {
      console.error('DELETE request failed:', error);
      return handleError(error, { ...config, method: 'delete', url: endpoint });
    }
  }

  static async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.request(config);
    } catch (error) {
      console.error('Generic request failed:', error);
      return handleError(error, config);
    }
  }
}
