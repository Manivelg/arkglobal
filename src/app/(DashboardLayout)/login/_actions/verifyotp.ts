"use server";

type VerifyOtpPayload = {
  username: string;
  code: string;
};

type VerifyOtpResponse = {
  success: boolean;
  message?: string;
  token?: string;
  data?: {
    email?: string;
    verified?: boolean;
    // Add other relevant properties
  };
};

export async function verifyOtpAction(
  values: VerifyOtpPayload
): Promise<VerifyOtpResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          code: values.code,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    // Validate the response structure
    if (!data.success) {
      throw new Error(data.message || "Invalid OTP");
    }

    return {
      success: true,
      token: data.token, // If your API returns a token
      data: {
        email: data.email,
        verified: data.verified,
        // Include other relevant data from the response
      },
      message: data.message || "OTP verified successfully",
    };
  } catch (error: unknown) {
    console.error("OTP verification error:", error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return {
      success: false,
      message: errorMessage || "An error occurred during OTP verification",
    };
  }
}
