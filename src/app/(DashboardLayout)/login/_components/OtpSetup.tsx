// "use client";
// import { Button } from "primereact/button";
// import { InputOtp } from "primereact/inputotp";
// import { Toast } from "primereact/toast";
// import React, { useState, useRef } from "react";
// import { verifyOtpAction } from "../_actions/verifyotp";

// interface otpSetupProps {
//   email: string | null;
// }

// function OtpSetup({ email }: otpSetupProps) {
//   const [token, setToken] = useState<any>(null);
//   const [verifyEmail, setVerifyEmail] = useState<any>(null);
//   const otpSendToast = useRef<any>(null);
//   const [changePassword, setChangePassword] = useState(false);

//   const handleVerifyOtp = async (token: string) => {
//     const response = await verifyOtpAction({
//       username: email,
//       code: token,
//     });
//     // const res = await fetch(
//     //   `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-otp`,
//     //   {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     method: "POST",
//     //     body: JSON.stringify({
//     //       username: `${email}`,
//     //       code: `${token}`,
//     //     }),
//     //   }
//     // );

//     const data = await response.json();

//     if (data.success === false) {
//       otpSendToast.current.show({
//         severity: "danger",
//         summary: "OTP Status",
//         detail: "OTP Wrong",
//       });
//     } else {
//       otpSendToast.current.show({
//         severity: "success",
//         summary: "OTP Status",
//         detail: "OTP Verified",
//       });

//       setChangePassword(true);
//     }
//     console.log("res", res);
//     console.log("data", data);
//   };

//   return (
//     <>
//       <Toast ref={otpSendToast} />

//       <InputOtp
//         value={token}
//         onChange={(e) => setToken(e.value)}
//         integerOnly
//         length={6}
//       />
//       <div className="error_msg_wrap h-[20px] text-red-500">
//         {token?.length < 6 && "Token must be 6 digit"}
//       </div>
//       <div className="button_gps gap-4 flex justify-center mt-3">
//         <Button label="Submit" onClick={() => handleVerifyOtp(token)} />
//       </div>
//     </>
//   );
// }

// export default OtpSetup;

"use client";
import { Button } from "primereact/button";
import { InputOtp, InputOtpChangeEvent } from "primereact/inputotp";
import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";
import { verifyOtpAction } from "../_actions/verifyotp";

interface OtpSetupProps {
  email: string | null;
}

function OtpSetup({ email }: OtpSetupProps) {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useRef<Toast>(null);

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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "OTP verification failed";

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 3000,
      });
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

      <InputOtp
        value={token}
        onChange={handleOtpChange}
        integerOnly
        length={6}
        className="w-full"
      />

      <div className="error-message h-[20px] text-red-500 text-sm mt-1">
        {error || (token?.length < 6 && "Token must be 6 digits")}
      </div>

      <div className="button-container flex justify-center gap-4 mt-4">
        <Button
          label={isLoading ? "Verifying..." : "Submit"}
          onClick={handleVerifyOtp}
          disabled={isLoading || token.length !== 6}
          className="w-full md:w-auto"
          severity="info"
        />
      </div>
    </div>
  );
}

export default OtpSetup;
