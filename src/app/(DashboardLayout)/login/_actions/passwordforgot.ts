"use server";

type ForgotPayload = {
  email: string;
};

type ForgotResponseData = {
  // Define the structure of your expected response data here
  // For example:
  token?: string;
  expiresAt?: string;
  // Add other fields you expect in the response
};

type ForgotResponse = {
  success: boolean;
  message?: string;
  data?: ForgotResponseData;
};

export async function forgotAction(
  values: ForgotPayload
): Promise<ForgotResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/forgot-password`,
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
      // Return server error response
      return {
        success: false,
        message: data.message || "Failed to send forgot password request.",
      };
    }

    // Success response
    return {
      success: true,
      message: data.message || "Password reset email sent successfully.",
      data: data.data,
    };
  } catch (error: unknown) {
    console.error("Forgot Password error:", error);

    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage || "An unexpected error occurred.",
    };
  }
}
