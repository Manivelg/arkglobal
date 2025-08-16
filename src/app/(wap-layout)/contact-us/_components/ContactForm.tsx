"use client";
import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(35, "Name cannot exceed 35 characters")
        .matches(
          /^(?!.*\s{2})[a-zA-Z\s]+$/,
          "Name cannot have consecutive spaces"
        )
        .required("Enter your name"),
      email: Yup.string().email("Invalid email").required("Enter your email"),
      phone: Yup.string().required("Enter your phone"),
      message: Yup.string().required("Enter your message"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted successfully", values);
    },
  });

  const renderError = (field: keyof typeof formik.values) =>
    formik.touched[field] &&
    formik.errors[field] && (
      <small className="errors">{formik.errors[field]}</small>
    );

  return (
    <section className="contacts py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold leading-14">Connect with Us</h2>
            <p className="text-center 2xl:w-3/5 xl:w-4/5 sm:w-4/5 mx-auto">
              Leave your information and a brief message. Someone will contact
              you to schedule a conversation.
            </p>
          </div>
          <div className="py-5 2xl:w-4/5 xl:w-4/5 sm:w-full">
            <form onSubmit={formik.handleSubmit}>
              {[
                {
                  id: "name",
                  component: (
                    <InputText
                      {...formik.getFieldProps("name")}
                      className="w-full contact_input"
                      placeholder="Name"
                      onInput={(e) => {
                        const input = e.currentTarget;
                        input.value = input.value
                          .replace(/[^a-zA-Z\s]/g, "")
                          .replace(/\s{2,}/g, " ");
                      }}
                    />
                  ),
                },
                {
                  id: "email",
                  component: (
                    <InputText
                      {...formik.getFieldProps("email")}
                      className="w-full contact_input"
                      placeholder="Email"
                      onInput={(e) => {
                        const input = e.currentTarget;
                        input.value = input.value
                          .replace(/[^a-zA-Z0-9@.+-]/g, "")
                          .replace(/\s{2,}/g, " ");
                      }}
                    />
                  ),
                },
                {
                  id: "phone",
                  component: (
                    <PhoneInput
                      country="sg"
                      value={formik.values.phone}
                      onChange={(value) => formik.setFieldValue("phone", value)}
                      onBlur={() => formik.setFieldTouched("phone", true)}
                    />
                  ),
                },
                {
                  id: "message",
                  component: (
                    <InputTextarea
                      {...formik.getFieldProps("message")}
                      className="w-full contact_input contact_msg"
                      placeholder="Message here..."
                      rows={5}
                      cols={30}
                    />
                  ),
                },
              ].map(({ id, component }) => (
                <div key={id} className="contact_one">
                  {component}
                  <div className="error">
                    {renderError(id as keyof typeof formik.values)}
                  </div>
                </div>
              ))}

              <div className="contact_one">
                <Button label="Submit" className="form_submit" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
