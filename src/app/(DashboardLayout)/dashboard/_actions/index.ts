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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard`,
      {
        next: { tags: ["contacts"] }, // Optional: for revalidation
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data: ApiResponse = await res.json();

    if (!data.success) {
      throw new Error(data.error || "Unknown error occurred");
    }

    return data;
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
