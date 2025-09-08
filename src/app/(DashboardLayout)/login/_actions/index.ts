// "use server";

// type LoginPayload = {
//   username: string;
//   password: string;
// };

// type LoginResponse = {
//   success: boolean;
//   message?: string;
//   token?: string;
//   data?: {
//     name?: string;
//     email?: string;
//     // Add other user properties as needed
//   };
// };

// export async function loginAction(
//   values: LoginPayload
// ): Promise<LoginResponse> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Login failed");
//     }

//     // Validate the response structure
//     if (!data.success || !data.token) {
//       throw new Error("Invalid response from server");
//     }

//     return {
//       success: true,
//       token: data.token,
//       data: data.user || data.data, // Ensure this matches your API response
//       message: data.message,
//     };
//   } catch (error) {
//     console.error("Login error:", error);
//     let errorMessage = "An error occurred during login";

//     if (error instanceof Error) {
//       errorMessage = error.message;
//     } else if (typeof error === "string") {
//       errorMessage = error;
//     }

//     return {
//       success: false,
//       message: errorMessage,
//     };
//   }
// }

"use server";

import { supabase } from "../../api/apiConfig";

type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

type SignupResponse = {
  success: boolean;
  message?: string;
  data?: {
    name?: string;
    email?: string;
    id?: string;
  };
};

export async function signupAction(
  values: SignupPayload
): Promise<SignupResponse> {
  try {
    const { username, email, password } = values;

    if (!username || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Sign up the user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      return {
        success: false,
        message: error.message || "Signup failed",
      };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Invalid signup response from server",
      };
    }

    return {
      success: true,
      message:
        data.user.confirmed_at === null
          ? "Signup successful! Please confirm your email before logging in."
          : "Signup successful! You can now log in.",
      data: {
        name: data.user.user_metadata?.username || username,
        email: data.user.email!,
        id: data.user.id,
      },
    };
  } catch (err: unknown) {
    console.error("Signup error:", err);
    let errorMessage = "An error occurred during signup";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}
