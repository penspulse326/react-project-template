import type { ApiResponse } from '~/types/http';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // 這裡換成靜態變數或使用 .env 替換
});

export const http = {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  },

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.post(url, data);
    return response.data;
  },

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.put(url, data);
    return response.data;
  },

  async delete<T>(url: string): Promise<T> {
    const response = await axiosInstance.delete(url);
    return response.data;
  },
};

/**
 * 統一處理 try-catch 的請求包裝器
 * @param requestFn 執行請求的非同步函數
 * @param fallbackMessage 發生錯誤時的預設提示訊息
 */
export async function safeRequest<T>(
  requestFn: () => Promise<T>,
  fallbackMessage = '系統發生錯誤',
): Promise<ApiResponse<T>> {
  try {
    const data = await requestFn();
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error as Error,
      message: error.response?.data?.message || error.message || fallbackMessage,
    };
  }
}
