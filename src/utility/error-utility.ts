import { AxiosError } from "axios";
import { type FormikErrors, type FormikValues } from "formik";

export function getError<T extends FormikValues>(
  error: AxiosError<FormikErrors<T>>
): {
  message: string;
  fieldErrors?: FormikErrors<T>;
} {
  if (typeof error.response?.data === "string") {
    return { message: error.response?.data };
  } else if (typeof error.response?.data?.detail === "string") {
    return { message: error.response?.data?.detail };
  } else if (
    error.response?.data?.non_field_errors instanceof Array &&
    typeof error.response?.data?.non_field_errors?.[0] === "string"
  ) {
    return {
      message: error.response?.data?.non_field_errors?.[0],
    };
  } else if (error.response?.status === 400 && error.response?.data) {
    // const errorData = error.response.data;
    // const firstField = Object.keys(errorData)[0];
    // const firstMessage = Array.isArray(errorData[firstField])
    //   ? errorData[firstField][0]
    //   : errorData[firstField];

    // return {
    //   fieldErrors: errorData,
    //   message: `${firstField}: ${firstMessage}`,
    // };

    const message =
      extractFirstErrorMessage(error.response.data) || "Please fix the errors.";

    return {
      fieldErrors: error.response.data,
      message,
    };
  } else {
    return { message: "Something went wrong." };
  }
}

export async function throwWithJsonResponse(err: AxiosError): Promise<never> {
  if (!err.response) throw err;

  const blob = err.response.data as Blob;
  if (!blob) throw err;

  const text = await blob.text();
  err.response.data = JSON.parse(text);
  throw err;
}

function extractFirstErrorMessage(data: any): string {
  if (!data) return "";

  if (Array.isArray(data)) {
    const message = data[0];
    return typeof message === "string" ? message : "";
  }

  if (typeof data === "object") {
    for (const value of Object.values(data)) {
      const message = extractFirstErrorMessage(value);
      if (message) return message;
    }
  }

  return "";
}
