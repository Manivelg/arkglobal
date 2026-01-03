// "use server";

// type ForgotPayload = {
//   email: string;
// };

// type ForgotResponse = {
//   success: boolean;
//   message?: string;
//   data?: Record<string, unknown>; // Object with string keys and unknown values
// };

// export async function forgotAction(
//   values: ForgotPayload
// ): Promise<ForgotResponse> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/forgot-password`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );

//     const responseData = await response.json();

//     if (!response.ok) {
//       return {
//         success: false,
//         message:
//           (responseData as { message?: string }).message ||
//           "Failed to send forgot password request.",
//       };
//     }

//     return {
//       success: true,
//       message:
//         (responseData as { message?: string }).message ||
//         "Password reset email sent successfully.",
//       data: responseData as Record<string, unknown>,
//     };
//   } catch (error) {
//     console.error("Forgot Password error:", error);

//     return {
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "An unexpected error occurred.",
//     };
//   }
// }

// "use server";

// type ForgotPayload = {
//   email: string;
// };

// type ForgotResponse = {
//   success: boolean;
//   message?: string;
// };

// export async function forgotAction(
//   values: ForgotPayload
// ): Promise<ForgotResponse> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/forgot-password`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//         cache: "no-store",
//       }
//     );

//     const responseData = await response.json();

//     if (!response.ok) {
//       return {
//         success: false,
//         message: responseData?.message || "Failed to send reset email",
//       };
//     }

//     return responseData as ForgotResponse;
//   } catch (error) {
//     console.error("Forgot Password error:", error);
//     return {
//       success: false,
//       message: "Server error. Please try again.",
//     };
//   }
// }

"use server";

type ForgotPayload = {
  email: string;
};

type ForgotResponse = {
  success: boolean;
  message?: string;
};

export async function forgotAction(
  values: ForgotPayload
): Promise<ForgotResponse> {
  try {
    // Debug logging
    console.log("Forgot action triggered for email:", values.email);

    const apiUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_APP_URL is not defined");
      return {
        success: false,
        message: "Server configuration error",
      };
    }

    const response = await fetch(`${apiUrl}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email }),
      cache: "no-store",
    });

    // Get response text first to handle non-JSON responses
    const responseText = await response.text();
    console.log("Raw API response:", responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON:", responseText);
      return {
        success: false,
        message: "Invalid server response",
      };
    }

    console.log("Parsed response data:", responseData);

    if (!response.ok) {
      return {
        success: false,
        message: responseData?.message || `Server error (${response.status})`,
      };
    }

    return responseData as ForgotResponse;
  } catch (error) {
    console.error("Forgot Password error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Server error. Please try again.",
    };
  }
}
