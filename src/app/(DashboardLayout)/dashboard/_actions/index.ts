"use server";

interface Contact {
  id: number;
  unique_id?: number;
  name?: string;
  company?: string;
  email?: string;
  mobile?: string;
  message?: string;
  date?: string;
  count?: string;
}

interface ApiResponse {
  success?: boolean;
  data?: Contact[];
  error?: string;
}

const getContactData = async (): Promise<ApiResponse> => {
  try {
    // Construct absolute URL for API call (required for server actions)
    const baseUrl = 
      process.env.NEXT_PUBLIC_APP_URL || 
      (process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : "http://localhost:5604");
    
    const apiUrl = `${baseUrl}/api/dashboard`;
    
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    console.log(res, "res");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Handle array response (as per your API route change)
    if (Array.isArray(data)) {
      return {
        success: true,
        data: data,
      };
    }

    // Handle object response with success field
    if (data.success !== undefined) {
      return data;
    }

    // Fallback: treat as success if data exists
    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error("Error in getContactData:", error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export default getContactData;
