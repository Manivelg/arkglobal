"use client";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function ConfirmPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const toast = useRef<Toast>(null);

  // Toast Message
  const showToast = (severity: "success" | "error", message: string) => {
    toast.current?.show({
      severity,
      summary: severity === "success" ? "Success" : "Error",
      detail: message,
      life: 3000,
    });
  };

  const passwordChangeSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contains one lowercase letter")
      .matches(/[A-Z]/, "Password must contains one uppercase letter")
      .matches(/\d/, "Password must contains one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
        <div className="text-center relative mb-6">
          <h1 className="text-2xl font-bold text-center">
            <span className="absolute left-0 top-[5px]">
              <i
                className="pi pi-arrow-circle-left cursor-pointer text-[#188699] hover:text-[#54b5c6]"
                style={{ fontSize: "1.5rem" }}
                onClick={() => {
                  router.push("/verify-otp");
                }}
              ></i>
            </span>
            Create New Password
          </h1>
        </div>

        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={passwordChangeSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              console.log("email", email);
              console.log("values.confirmPassword", values.confirmPassword);

              const res = await fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/change-password`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: email,
                    password: values.confirmPassword,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error("Password change failed");
              }

              await res.json();
              showToast("success", "Password changed successfully");
              router.push("/login");
              resetForm();
            } catch (error: unknown) {
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred";
              showToast("error", errorMessage);
            }
          }}
        >
          {({
            isSubmitting,
            resetForm,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Form>
              <div className="form_groups">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium mb-2"
                >
                  New Password
                </label>
                <span className=" mt-3">
                  <InputText
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    placeholder="Enter Password..."
                    className={`w-full ${
                      errors.newPassword && touched.newPassword
                        ? "p-invalid"
                        : ""
                    }`}
                    autoFocus={true}
                  />
                </span>
                <div className="error_msg_wrap h-[30px] text-red-500 text-sm flex items-center">
                  <ErrorMessage name="newPassword" />
                </div>
              </div>

              <div className="form_groups">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                >
                  Confirm Password
                </label>
                <span className="mt-3">
                  <InputText
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className={`w-full ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter Password..."
                  />
                </span>
                <div className="error_msg_wrap h-[30px] text-red-500 text-sm flex items-center">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>

              <div className="button_gps flex justify-center gap-2.5 mt-4">
                <Button
                  label="Reset"
                  type="button"
                  onClick={() => resetForm()}
                  className="p-button-secondary"
                />
                <Button label="Submit" type="submit" disabled={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ConfirmPassword;
