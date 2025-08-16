"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { forgotAction } from "../_actions/passwordforgot";

function ForgotPassword() {
  const toast = useRef<Toast>(null);
  const router = useRouter();

  // Toast notification functions
  const showToast = (
    severity: "success" | "warn" | "error",
    message: string
  ) => {
    toast.current?.show({
      severity,
      summary: severity.charAt(0).toUpperCase() + severity.slice(1),
      detail: message,
      life: 3000,
    });
  };

  // Forgot password validation schema
  const forgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Forgot password form submission handler
  const forgotPasswordFormik = useFormik({
    initialValues: { email: "" },

    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await forgotAction(values);

        if (response?.success) {
          showToast("success", response.message || "Mail sent successfully");
          //   setShowOtp(false);
          await router.push(
            `/verify-otp?email=${encodeURIComponent(values.email)}`
          );
        } else {
          showToast("error", response?.message || "Failed to send reset email");
        }
      } catch (error: unknown) {
        console.error("Forgot Password Error:", error);
        let errorMessage = "Failed to send reset email";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        showToast("error", errorMessage || "Failed to send reset email");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Toast ref={toast} />
      <>
        <div className="text-center relative mb-6">
          <h1 className="text-2xl font-bold text-center">
            <span className="absolute left-0 top-[5px]">
              <i
                className="pi pi-arrow-circle-left cursor-pointer text-[#188699] hover:text-[#54b5c6]"
                style={{ fontSize: "1.5rem" }}
                onClick={() => {
                  router.push("/login");
                }}
              ></i>
            </span>
            Forgot Password
          </h1>
        </div>
        <form
          onSubmit={forgotPasswordFormik.handleSubmit}
          className="space-y-4"
        >
          <div className="m-0 h-[272px]">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <InputText
                id="email"
                name="email"
                type="email"
                className="w-full"
                placeholder="Your registered email"
                autoFocus={true}
                value={forgotPasswordFormik.values.email}
                onChange={forgotPasswordFormik.handleChange}
                onBlur={forgotPasswordFormik.handleBlur}
                autoComplete="off"
              />
              <p className="h-[40px] flex items-center">
                {forgotPasswordFormik.touched.email &&
                  forgotPasswordFormik.errors.email && (
                    <small className="text-red-500">
                      {forgotPasswordFormik.errors.email}
                    </small>
                  )}
              </p>
            </div>
            <div className="">
              <p className="text-sm text-[#606060]">
                OTP for reset password will be send to your registered email
                address. If account is valid.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              label="Send Reset Link"
              className="w-full"
              disabled={forgotPasswordFormik.isSubmitting}
              loading={forgotPasswordFormik.isSubmitting}
            />
          </div>
        </form>
      </>
    </>
  );
}

export default ForgotPassword;
