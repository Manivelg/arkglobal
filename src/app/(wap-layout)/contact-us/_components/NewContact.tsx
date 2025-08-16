"use client";
import React, { useState, useMemo, useCallback, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ContactsList } from "../_actions";
import { submitContactAction } from "../_actions/clients-contact";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

function NewContact() {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Contacts = ContactsList[0].data;
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

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
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .min(3, "Name must be at least 3 characters")
          .max(35, "Name cannot exceed 35 characters")
          .matches(/^(?!.*\s{2})[a-zA-Z\s]+$/, "No consecutive spaces allowed")
          .required("Enter your name"),
        email: Yup.string().email("Invalid email").required("Enter your email"),
        mobile: Yup.string().required("Enter your phone"),
        message: Yup.string().required("Enter your message"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      email: "",
      mobile: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const response = await submitContactAction(values);
        // console.log("Submitting data:", values);
        // console.log("response", response);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        resetForm();
        formik.setFieldValue("mobile", "+65");
        router.push("/");
        showToast(
          "success",
          response.message || "Login successful! Redirecting..."
        );
      } catch (error) {
        console.error("Form submission error", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const formattedValue =
        name === "name"
          ? value.replace(/[^a-zA-Z\s]/g, "").replace(/\s{2,}/g, " ") // Remove numbers & extra spaces
          : value;
      formik.setFieldValue(name, formattedValue);
    },
    [formik]
  );

  const handleWhatsAppClick = (number: string) => {
    const formattedNumber = number.replace(/\D/g, "");
    const message = "Hi, I'm interested in your services. ";
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Toast ref={toast} />

      <section className="contacts continue_bg py-10">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Section */}
            <div className="flex flex-col justify-evenly continue">
              <div className="continueOne">
                <h2 className="text-4xl font-bold leading-14">
                  Connect with Us
                </h2>
                <p className="2xl:w-3/5 xl:w-4/5 sm:w-full continuePara">
                  Leave your information and a brief message, and we’ll reach
                  out to schedule a conversation.
                </p>
              </div>

              <div className="continueTwo">
                <p className="continueHeader">
                  We provide 24/7 support — contact us anytime
                </p>
                <div className="grid grid-cols-12 gap_set">
                  {Contacts.slice(1, 5).map((e) => (
                    <div
                      className="lg:col-span-6 md:col-span-12 sm:col-span-6 supports"
                      key={e.id}
                      onClick={() => handleWhatsAppClick(e.PilotPhone)}
                    >
                      <div className="flex items-center gap-2 supportTag">
                        <div>
                          <Image
                            src="/assets/footer/support.svg"
                            width={40}
                            height={40}
                            alt={companyUrl}
                            className="mr-1 ml-1 msgIcon"
                          />
                        </div>
                        <div className="">
                          <p className="continuename">{e.PilotName}</p>
                          <p className="continuephone">{e.PilotPhone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="py-5 2xl:w-4/5 xl:w-4/5 sm:w-full">
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                {/* Name Field */}
                <div className="contact_one">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    className="w-full contact_input"
                    placeholder="Name"
                    autoComplete="off"
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name && (
                      <small className="errors">{formik.errors.name}</small>
                    )}
                  </div>
                </div>

                {/* Company Field */}
                <div className="contact_one">
                  <InputText
                    id="company"
                    name="company"
                    value={formik.values.company}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    className="w-full contact_input"
                    placeholder="Company/Vessel Name (Optional)"
                    autoComplete="off"
                  />
                  <div className="error">
                    {formik.touched.company && formik.errors.company && (
                      <small className="errors">{formik.errors.company}</small>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="contact_one">
                  <InputText
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full contact_input"
                    placeholder="Email"
                    autoComplete="off"
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email && (
                      <small className="errors">{formik.errors.email}</small>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="contact_one">
                  <PhoneInput
                    country="sg"
                    value={formik.values.mobile}
                    onChange={(value) => formik.setFieldValue("mobile", value)}
                    onBlur={() => formik.setFieldTouched("mobile", true)}
                    inputProps={{
                      name: "mobile",
                      required: false,
                    }}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile && (
                      <small className="errors">{formik.errors.mobile}</small>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="contact_one relative">
                  <div className="absolute right-[5px] top-[-17px] bg-white text-[0.7rem] p-2">
                    {200 - (formik.values.message?.length || 0)}/0
                  </div>
                  <InputTextarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        formik.handleChange(e);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    className="w-full contact_input contact_msg"
                    placeholder="Message here..."
                    rows={5}
                  />
                  <div className="error">
                    {formik.touched.message && formik.errors.message && (
                      <small className="errors">{formik.errors.message}</small>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="contact_one center_button">
                  <Button
                    label={isSubmitting ? "Submitting..." : "Submit"}
                    className="contact_button"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewContact;
