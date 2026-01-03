// "use client";
// import React, { useRef } from "react";
// import { useRouter } from "next/navigation";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Button } from "primereact/button";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Toast } from "primereact/toast";
// import Cookies from "js-cookie";
// import { loginAction } from "../_actions";

// function LoginForm() {
//   const router = useRouter();
//   const toast = useRef<Toast>(null);

//   // Toast notification functions
//   const showToast = (
//     severity: "success" | "warn" | "error",
//     message: string
//   ) => {
//     toast.current?.show({
//       severity,
//       summary: severity.charAt(0).toUpperCase() + severity.slice(1),
//       detail: message,
//       life: 3000,
//     });
//   };

//   // Form validation schema
//   const validationSchema = Yup.object({
//     username: Yup.string()
//       .min(4, "Username must be at least 4 characters")
//       .max(20, "Username cannot exceed 20 characters")
//       .required("Username is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   // Form submission handler
//   const formik = useFormik({
//     initialValues: { username: "", password: "" },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const response = await loginAction(values);
//         if (response.success) {
//           Cookies.set("token", response.token as string);
//           Cookies.set(
//             "user",
//             JSON.stringify({
//               username: response.data?.name,
//               email: response.data?.email,
//               ...response.data,
//             }),
//             {
//               expires: 1,
//               secure: process.env.NEXT_PUBLIC_APP_URL === "production",
//               sameSite: "strict",
//             }
//           );

//           showToast(
//             "success",
//             response.message || "Login successful! Redirecting..."
//           );
//           router.push("/dashboard");
//         } else {
//           throw new Error(response.message || "Login failed");
//         }
//       } catch (error: unknown) {
//         const errorMessage =
//           error instanceof Error
//             ? error.message
//             : "An error occurred during login";
//         showToast("error", errorMessage);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
//       <Toast ref={toast} />
//       <>
//         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           <div className="m-0">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium mb-2"
//             >
//               Username
//             </label>
//             <InputText
//               id="username"
//               name="username"
//               type="text"
//               className="w-full"
//               placeholder="UserName"
//               autoFocus={true}
//               value={formik.values.username}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               autoComplete="off"
//             />
//             <p className="h-[40px] flex items-center">
//               {formik.touched.username && formik.errors.username && (
//                 <small className="text-red-500">{formik.errors.username}</small>
//               )}
//             </p>
//           </div>

//           <div className="m-0">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium mb-2"
//             >
//               Password
//             </label>
//             <Password
//               id="password"
//               name="password"
//               className="w-full"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               toggleMask
//               feedback={false}
//               placeholder="Password"
//             />
//             <p className="h-[40px] flex items-center">
//               {formik.touched.password && formik.errors.password && (
//                 <small className="text-red-500">{formik.errors.password}</small>
//               )}
//             </p>
//           </div>

//           <div className="w-full">
//             <p className="text-sm">
//               <span
//                 className="cursor-pointer hover:text-[#188699]"
//                 onClick={() => {
//                   router.push("/forgot-password");
//                 }}
//               >
//                 Forot Password?
//               </span>
//             </p>
//           </div>

//           <Button
//             type="submit"
//             label="Login"
//             className="w-full"
//             disabled={formik.isSubmitting}
//             loading={formik.isSubmitting}
//           />
//         </form>
//       </>
//     </div>
//   );
// }

// export default LoginForm;

"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const toast = useRef<Toast>(null);

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

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Login failed");
        }

        if (data.token && data.user) {
          // Save token
          Cookies.set("token", data.token, {
            expires: 1,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });

          // Save user info
          Cookies.set(
            "user",
            JSON.stringify({
              username: data.user.username,
              email: data.user.email,
              id: data.user.id,
            }),
            {
              expires: 1,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            }
          );

          showToast("success", "Login successful! Redirecting...");
          router.replace("/dashboard");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        showToast("error", errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toast ref={toast} />
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h1>

      <form onSubmit={formik.handleSubmit} className="">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <InputText
            id="email"
            name="email"
            type="email"
            className="w-full p-inputtext-sm"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="min-h-7.5">
            {formik.touched.email && formik.errors.email && (
              <small className="text-red-500">{formik.errors.email}</small>
            )}
          </p>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Password
            id="password"
            name="password"
            className="w-full"
            inputClassName="w-full p-inputtext-sm"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            toggleMask
            feedback={false}
            placeholder="Password"
          />
          <p className="min-h-7.5">
            {formik.touched.password && formik.errors.password && (
              <small className="text-red-500">{formik.errors.password}</small>
            )}
          </p>
        </div>

        <div>
          <Link
            href="/forgot-password"
            className="block text-sm font-medium text-right text-[#1b4f72] hover:text-blue-700"
          >
            Forgot Password?
          </Link>
          <p className="min-h-6"></p>
        </div>

        <Button
          type="submit"
          label="Login"
          className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
        />

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
