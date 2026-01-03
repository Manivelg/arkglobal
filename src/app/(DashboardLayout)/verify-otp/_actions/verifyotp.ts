// "use client";

// type VerifyOtpPayload = {
//   username: string;
//   code: string;
// };

// type VerifyOtpResponse = {
//   success: boolean;
//   message?: string;
//   token?: string;
//   data?: {
//     email?: string;
//     verified?: boolean;
//   };
// };

// export async function verifyOtpAction(
//   values: VerifyOtpPayload
// ): Promise<VerifyOtpResponse> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-otp`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );

//     // ✅ Read as text first
//     const text = await response.text();

//     // ✅ Handle empty response
//     if (!text) {
//       return {
//         success: false,
//         message: "Empty response from server",
//       };
//     }

//     // ✅ Safe JSON parse
//     const data = JSON.parse(text);

//     if (!response.ok || !data.success) {
//       return {
//         success: false,
//         message: data.message || "Invalid OTP",
//       };
//     }

//     return {
//       success: true,
//       message: data.message || "OTP verified successfully",
//       token: data.token,
//       data: {
//         email: data.email,
//         verified: data.verified,
//       },
//     };
//   } catch (error) {
//     console.error("OTP verification error:", error);

//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "OTP verification failed",
//     };
//   }
// }

// "use client";

// type VerifyOtpPayload = {
//   username: string;
//   code: string;
// };

// type VerifyOtpResponse = {
//   success: boolean;
//   message?: string;
//   token?: string;
//   data?: {
//     email?: string;
//     verified?: boolean;
//   };
// };

// export async function verifyOtp(
//   values: VerifyOtpPayload
// ): Promise<VerifyOtpResponse> {
//   try {
//     const response = await fetch("/api/verify-otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return {
//         success: false,
//         message: data?.message || "OTP verification failed",
//       };
//     }

//     return {
//       success: true,
//       message: data.message || "OTP verified successfully",
//       token: data.token,
//       data: {
//         email: data.email,
//         verified: data.verified,
//       },
//     };
//   } catch (error) {
//     console.error("OTP verification error:", error);

//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Network error occurred",
//     };
//   }
// }

"use client";

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
  };
};

export async function verifyOtp(
  values: VerifyOtpPayload
): Promise<VerifyOtpResponse> {
  try {
    // 🔍 LOG REQUEST
    console.log("➡️ verifyOtp request:", values);

    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    // 🔍 LOG RESPONSE
    console.log("⬅️ verifyOtp response:", data);
    console.log("⬅️ HTTP status:", response.status);

    // ✅ IMPORTANT FIX
    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data?.message || "Invalid OTP",
      };
    }

    return {
      success: true,
      message: data.message || "OTP verified successfully",
      token: data.token,
      data: {
        email: data.email,
        verified: data.verified,
      },
    };
  } catch (error) {
    console.error("❌ OTP verification error:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Network error occurred",
    };
  }
}
