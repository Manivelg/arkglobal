"use server";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  mobile?: string;
  message: string;
};

type ContactResponse = {
  success: boolean;
  message?: string;
  data?: {
    id?: number;
    name: string;
    company: string;
    email: string;
    mobile?: string;
    message: string;
  };
};

export async function submitContactAction(
  values: ContactPayload
): Promise<ContactResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/client-contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Form submission failed" + response);
    }

    // Validate the response structure
    if (!data.success) {
      throw new Error("Invalid response from server");
    }

    return {
      success: true,
      data: data.data,
      message: data.message || "Form submitted successfully",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    let errorMessage = "An error occurred while submitting the form";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}
