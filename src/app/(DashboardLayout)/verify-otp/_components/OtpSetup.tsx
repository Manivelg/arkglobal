"use client";
import { Button } from "primereact/button";
import { InputOtp, InputOtpChangeEvent } from "primereact/inputotp";
import { Toast } from "primereact/toast";
import React, { useState, useRef, useEffect } from "react";
import { verifyOtpAction } from "../_actions/verifyotp";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

  useEffect(() => {
    // Focus the first input of the OTP component when mounted
    if (inputOtpRef.current) {
      const inputs = document.querySelectorAll(".p-inputotp-input");
      if (inputs.length > 0) {
        (inputs[0] as HTMLInputElement).focus();
      }
    }
  }, []);

  const handleVerifyOtp = async () => {
    // Validate inputs
    if (!email) {
      setError("Email is required");
      return;
    }

    if (token.length !== 6) {
      setError("Token must be 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await verifyOtpAction({
        username: email,
        code: token,
      });

      if (!response.success) {
        throw new Error(response.message || "OTP verification failed");
      }

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: response.message || "OTP verified successfully",
        life: 3000,
      });

      router.push(`/new-password?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      let errorMessage = "OTP verification failed";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as ErrorResponse).message || errorMessage;
      }

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 3000,
      });
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: InputOtpChangeEvent) => {
    if (e.value !== null && e.value !== undefined) {
      const stringValue = e.value.toString();
      setToken(stringValue);

      if (error && stringValue.length === 6) {
        setError(null);
      }
    } else {
      setToken("");
    }
  };

  return (
    <div className="otp-verification-container">
      <Toast ref={toast} />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
        <div className="text-center relative mb-6">
          <h1 className="text-2xl font-bold text-center">
            <span className="absolute left-0 top-[5px]">
              <i
                className="pi pi-arrow-circle-left cursor-pointer text-[#188699] hover:text-[#54b5c6]"
                style={{ fontSize: "1.5rem" }}
                onClick={() => {
                  router.push("/forgot-password");
                }}
              ></i>
            </span>
            Secuity Verification
          </h1>
        </div>

        <div className="m-0 h-[256px]">
          <InputOtp
            ref={inputOtpRef}
            value={token}
            onChange={handleOtpChange}
            integerOnly
            length={6}
            className="w-full"
            autoComplete="one-time-code"
          />

          <div className="error-message h-[30px] text-red-500 text-sm flex items-center justify-start">
            {error || (token?.length < 6 && "Token must be 6 digits")}
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
    </div>
  );
}

export default OtpSetup;
