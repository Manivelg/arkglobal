"use server";
import { headers } from "next/headers";

type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

type RequestOptions<T> = {
  endpoint: string;
  data?: T;
  params?: Record<string, string>;
  token?: string;
  tags?: string[];
  cache?: RequestCache;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (!baseUrl) {
      throw new Error("API base URL is required");
    }
  }

  private async request<Payload, Response>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    options: RequestOptions<Payload>
  ): Promise<ApiResponse<Response>> {
    const { endpoint, data, params, tags, cache } = options;
    let url = `${this.baseUrl}${endpoint}`;

    try {
      // Add query params for GET requests
      if (method === "GET" && params) {
        const queryString = new URLSearchParams(params).toString();
        url += queryString ? `?${queryString}` : "";
      }

      //   const cookie = headers().get("cookie");
      const headersList = await headers();
      const cookie = headersList.get("cookie") || "";
      const isFormData = data instanceof FormData;

      const response = await fetch(url, {
        method,
        headers: {
          ...(!isFormData && { "Content-Type": "application/json" }),
          accept: "application/json",
          Cookie: cookie,
        },
        credentials: "include",
        body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
        next: { tags },
        cache,
      });

      const responseData = await response.json();
      console.log(responseData, url, "responseData");

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          message: responseData.message || "Request failed",
          errors: responseData.errors,
          data: responseData.data,
        };
      }

      return {
        success: true,
        statusCode: response.status,
        ...responseData,
      };
    } catch (error) {
      console.error("API request failed:", error);
      return {
        success: false,
        statusCode: 500,
        message: "An unexpected error occurred",
      };
    }
  }

  async get<Response>(
    endpoint: string,
    params?: Record<string, string>,
    options?: { tags?: string[]; cache?: RequestCache }
  ): Promise<ApiResponse<Response>> {
    return this.request("GET", {
      endpoint,
      params,
      tags: options?.tags,
      cache: options?.cache,
    });
  }

  async post<Payload, Response>(
    endpoint: string,
    data: Payload,
    options?: { tags?: string[] }
  ): Promise<ApiResponse<Response>> {
    return this.request("POST", { endpoint, data, tags: options?.tags });
  }

  async put<Payload, Response>(
    endpoint: string,
    data: Payload,
    options?: { tags?: string[] }
  ): Promise<ApiResponse<Response>> {
    return this.request("PUT", { endpoint, data, tags: options?.tags });
  }

  async patch<Payload, Response>(
    endpoint: string,
    data: Partial<Payload>,
    options?: { tags?: string[] }
  ): Promise<ApiResponse<Response>> {
    return this.request("PATCH", { endpoint, data, tags: options?.tags });
  }

  async delete<Response>(
    endpoint: string,
    options?: { tags?: string[] }
  ): Promise<ApiResponse<Response>> {
    return this.request("DELETE", { endpoint, tags: options?.tags });
  }
}

// Create and export a configured instance
const apiClient = new ApiClient(process.env.API_URL!);
export default apiClient;
