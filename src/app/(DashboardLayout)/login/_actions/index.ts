"use server";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message?: string;
  token?: string;
  data?: {
    name?: string;
    email?: string;
    // Add other user properties as needed
  };
};

export async function loginAction(
  values: LoginPayload
): Promise<LoginResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Validate the response structure
    if (!data.success || !data.token) {
      throw new Error("Invalid response from server");
    }

    return {
      success: true,
      token: data.token,
      data: data.user || data.data, // Ensure this matches your API response
      message: data.message,
    };
  } catch (error) {
    console.error("Login error:", error);
    let errorMessage = "An error occurred during login";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}
