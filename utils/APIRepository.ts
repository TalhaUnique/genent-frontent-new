"use client";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

// Add an interceptor to include authentication headers
axiosInstance.interceptors.request.use(
  (config) => {
    const isAuthRequest = config.url?.includes('/auth'); // Check if the request is for authentication
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    if (!isAuthRequest && token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`, // Add Authorization header
      };
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

export default class APIRepository {
  static async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.get(endpoint, config);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  static async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.delete(endpoint, config);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  static async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.request(config);
    } catch (error) {
      console.error('Generic request failed:', error);
      throw error;
    }
  }
}
