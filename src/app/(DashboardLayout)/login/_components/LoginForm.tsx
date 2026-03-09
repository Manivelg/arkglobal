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

function LoginForm() {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const showToast = (
    severity: "success" | "warn" | "error",
    message: string,
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
          body: JSON.stringify(values),
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
            sameSite: "lax",
            path: "/",
          });

          // Save user
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
              path: "/",
            },
          );

          showToast("success", "Login successful! Redirecting...");

          // redirect after cookie set
          setTimeout(() => {
            router.replace("/dashboard");
          }, 200);
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

      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
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

        {/* Password */}
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

        {/* Login Button */}
        <Button
          type="submit"
          label="Login"
          className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
        />
      </form>
    </div>
  );
}

export default LoginForm;

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

// function LoginForm() {
//   const router = useRouter();
//   const toast = useRef<Toast>(null);

//   const showToast = (
//     severity: "success" | "warn" | "error",
//     message: string,
//   ) => {
//     toast.current?.show({
//       severity,
//       summary: severity.charAt(0).toUpperCase() + severity.slice(1),
//       detail: message,
//       life: 3000,
//     });
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const response = await fetch("/api/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: values.email,
//             password: values.password,
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.message || "Login failed");
//         }

//         if (data.token && data.user) {
//           // Save token
//           Cookies.set("token", data.token, {
//             expires: 1,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//             path: "/",
//           });

//           // Save user info
//           Cookies.set(
//             "user",
//             JSON.stringify({
//               username: data.user.username,
//               email: data.user.email,
//               id: data.user.id,
//             }),
//             {
//               expires: 1,
//               secure: process.env.NODE_ENV === "production",
//               sameSite: "strict",
//               path: "/",
//             },
//           );

//           showToast("success", "Login successful! Redirecting...");
//           setTimeout(() => {
//             router.replace("/dashboard");
//           }, 100);
//           // router.replace("/dashboard");
//           // console.log(response, "response");
//         } else {
//           throw new Error("Invalid response from server");
//         }
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : "Login failed";
//         showToast("error", errorMessage);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <Toast ref={toast} />
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Login
//       </h1>

//       <form onSubmit={formik.handleSubmit} className="">
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email
//           </label>
//           <InputText
//             id="email"
//             name="email"
//             type="email"
//             className="w-full p-inputtext-sm"
//             placeholder="Email address"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           <p className="min-h-7.5">
//             {formik.touched.email && formik.errors.email && (
//               <small className="text-red-500">{formik.errors.email}</small>
//             )}
//           </p>
//         </div>

//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Password
//           </label>
//           <Password
//             id="password"
//             name="password"
//             className="w-full"
//             inputClassName="w-full p-inputtext-sm"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             toggleMask
//             feedback={false}
//             placeholder="Password"
//           />
//           <p className="min-h-7.5">
//             {formik.touched.password && formik.errors.password && (
//               <small className="text-red-500">{formik.errors.password}</small>
//             )}
//           </p>
//         </div>

//         {/* <div>
//           <Link
//             href="/forgot-password"
//             className="block text-sm font-medium text-right text-[#1b4f72] hover:text-blue-700"
//           >
//             Forgot Password?
//           </Link>
//           <p className="min-h-6"></p>
//         </div> */}

//         <Button
//           type="submit"
//           label="Login"
//           className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
//           disabled={formik.isSubmitting}
//           loading={formik.isSubmitting}
//         />

//         {/* <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Don&apos;t have an account?{" "}
//             <span
//               className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
//               onClick={() => router.push("/signup")}
//             >
//               Sign up
//             </span>
//           </p>
//         </div> */}
//       </form>
//     </div>
//   );
// }

// export default LoginForm;

// "use client";
// import React, { useRef } from "react";
// import { useRouter } from "next/navigation";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Button } from "primereact/button";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Toast } from "primereact/toast";

// function LoginForm() {
//   const router = useRouter();
//   const toast = useRef<Toast>(null);

//   const showToast = (severity: "success" | "error", message: string) => {
//     toast.current?.show({
//       severity,
//       summary: severity.toUpperCase(),
//       detail: message,
//       life: 3000,
//     });
//   };

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: Yup.object({
//       email: Yup.string().email().required(),
//       password: Yup.string().min(6).required(),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const response = await fetch("/api/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(values),
//         });

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.message);
//         }

//         showToast("success", "Login successful!");
//         router.replace("/dashboard");
//       } catch (err: any) {
//         showToast("error", err.message || "Login failed");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <Toast ref={toast} />
//       <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//       {/* <form onSubmit={formik.handleSubmit}>
//         <InputText
//           name="email"
//           placeholder="Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         <p className="min-h-7.5">
//           {formik.touched.email && formik.errors.email && (
//             <small className="text-red-500">{formik.errors.email}</small>
//           )}
//         </p>

//         <Password
//           className="w-full"
//           name="password"
//           placeholder="Password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           toggleMask
//           feedback={false}
//         />
//         <p className="min-h-7.5">
//           {formik.touched.password && formik.errors.password && (
//             <small className="text-red-500">{formik.errors.password}</small>
//           )}
//         </p>

//         <Button
//           className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
//           type="submit"
//           label="Login"
//           loading={formik.isSubmitting}
//         />
//       </form> */}

//       <form onSubmit={formik.handleSubmit} className="">
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email
//           </label>
//           <InputText
//             id="email"
//             name="email"
//             type="email"
//             className="w-full p-inputtext-sm"
//             placeholder="Email address"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             autoFocus={true}
//           />
//           <p className="min-h-7.5">
//             {formik.touched.email && formik.errors.email && (
//               <small className="text-red-500">{formik.errors.email}</small>
//             )}
//           </p>
//         </div>

//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Password
//           </label>
//           <Password
//             id="password"
//             name="password"
//             className="w-full"
//             inputClassName="w-full p-inputtext-sm"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             toggleMask
//             feedback={false}
//             placeholder="Password"
//           />
//           <p className="min-h-7.5">
//             {formik.touched.password && formik.errors.password && (
//               <small className="text-red-500">{formik.errors.password}</small>
//             )}
//           </p>
//         </div>

//         {/* <div>
//           <Link
//             href="/forgot-password"
//             className="block text-sm font-medium text-right text-[#1b4f72] hover:text-blue-700"
//           >
//             Forgot Password?
//           </Link>
//           <p className="min-h-6"></p>
//         </div> */}

//         <Button
//           type="submit"
//           label="Login"
//           className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
//           disabled={formik.isSubmitting}
//           loading={formik.isSubmitting}
//         />

//         {/* <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Don&apos;t have an account?{" "}
//             <span
//               className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
//               onClick={() => router.push("/signup")}
//             >
//               Sign up
//             </span>
//           </p>
//         </div> */}
//       </form>
//     </div>
//   );
// }

// export default LoginForm;
