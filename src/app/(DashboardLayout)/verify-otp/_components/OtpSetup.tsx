"use client";
// Dependencies
import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { InputOtp, InputOtpChangeEvent } from "primereact/inputotp";

// Components
// import { verifyOtpAction } from "../_actions/verifyotp";

interface ErrorResponse {
  message?: string;
}

function OtpSetup() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useRef<Toast>(null);
  const inputOtpRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Focus the first input of the OTP component when mounted
    if (inputOtpRef.current) {
      const inputs = document.querySelectorAll(".p-inputotp-input");
      if (inputs.length > 0) {
        (inputs[0] as HTMLInputElement).focus();
      }
    }
  }, []);

  // const handleVerifyOtp = async () => {
  //   // Validate inputs
  //   if (!email) {
  //     setError("Email is required");
  //     return;
  //   }

  //   if (token.length !== 6) {
  //     setError("Token must be 6 digits");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await verifyOtpAction({
  //       username: email,
  //       code: token,
  //     });

  //     if (!response.success) {
  //       throw new Error(response.message || "OTP verification failed");
  //     }

  //     toast.current?.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: response.message || "OTP verified successfully",
  //       life: 3000,
  //     });

  //     router.push(`/new-password?email=${encodeURIComponent(email)}`);
  //   } catch (error: unknown) {
  //     let errorMessage = "OTP verification failed";

  //     if (error instanceof Error) {
  //       errorMessage = error.message;
  //     } else if (error && typeof error === "object" && "message" in error) {
  //       errorMessage = (error as ErrorResponse).message || errorMessage;
  //     }

  //     toast.current?.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: errorMessage,
  //       life: 3000,
  //     });
  //     console.error("OTP verification error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleVerifyOtp = async () => {
    setSubmitted(true);

    if (!email) {
      setError("Email is required");
      return;
    }

    if (token.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    console.log("➡️ Sending OTP request:", {
      username: email,
      code: token,
      codeType: typeof token,
    });

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, code: token }),
      });

      console.log("⬅️ Response status:", res.status);

      const data = await res.json();

      console.log("⬅️ Response body:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid OTP");
      }

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: data.message || "OTP verified successfully",
        life: 3000,
      });

      router.replace(`/new-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err instanceof Error ? err.message : "Invalid OTP",
        life: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleVerifyOtp = async () => {

  //   if (!email) {
  //     setError("Email is required");
  //     return;
  //   }

  //   if (token.length !== 6) {
  //     setError("OTP must be 6 digits");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch("/api/verify-otp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: email,
  //         code: token,
  //       }),
  //     });

  //     const text = await res.text();

  //     if (!text) {
  //       throw new Error("Empty response from server");
  //     }

  //     const data = JSON.parse(text);

  //     if (!res.ok || !data.success) {
  //       throw new Error(data.message || "Invalid OTP");
  //     }

  //     toast.current?.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: data.message || "OTP verified successfully",
  //       life: 3000,
  //     });

  //     router.push(`/new-password?email=${encodeURIComponent(email)}`);
  //   } catch (err) {
  //     const message =
  //       err instanceof Error ? err.message : "OTP verification failed";

  //     toast.current?.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: message,
  //       life: 3000,
  //     });

  //     console.error("OTP verification error:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleOtpChange = (e: InputOtpChangeEvent) => {
    const value = e.value;

    if (value === null || value === undefined) {
      setToken("");
      return;
    }

    const otp = String(value).replace(/\D/g, "");

    setToken(otp);

    if (submitted && otp.length === 6) {
      setError(null);
      setSubmitted(false);
    }
  };

  console.log("Sending OTP:", token);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toast ref={toast} />
      <div className="text-center relative mb-6">
        <h1 className="text-2xl font-bold text-center">
          <span className="absolute left-0 top-1.25">
            <i
              className="pi pi-arrow-circle-left cursor-pointer text-[#188699] hover:text-[#54b5c6]"
              style={{ fontSize: "1.5rem" }}
              onClick={() => {
                router.push("/forgot-password");
              }}
            ></i>
          </span>
          Verify OTP
        </h1>
      </div>

      <div className="m-0 h-64">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Enter OTP
        </label>
        <InputOtp
          ref={inputOtpRef}
          value={token}
          onChange={handleOtpChange}
          integerOnly
          length={6}
          className="w-full"
          autoComplete="one-time-code"
          autoFocus={true}
        />

        <div className="error-message h-7.5 text-red-500 text-sm flex items-center justify-start">
          {submitted && error}
        </div>
      </div>

      <div className="button-container flex justify-center gap-4 mt-4">
        <Button
          label={isLoading ? "Verifying..." : "Submit"}
          onClick={handleVerifyOtp}
          disabled={isLoading || token.length !== 6}
          className="w-full"
          severity="info"
        />
      </div>
    </div>
  );
}

export default OtpSetup;
