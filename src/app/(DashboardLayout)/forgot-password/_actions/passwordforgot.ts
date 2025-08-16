"use server";

type ForgotPayload = {
  email: string;
};

type ForgotResponse = {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>; // Object with string keys and unknown values
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

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          (responseData as { message?: string }).message ||
          "Failed to send forgot password request.",
      };
    }

    return {
      success: true,
      message:
        (responseData as { message?: string }).message ||
        "Password reset email sent successfully.",
      data: responseData as Record<string, unknown>,
    };
  } catch (error) {
    console.error("Forgot Password error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}
