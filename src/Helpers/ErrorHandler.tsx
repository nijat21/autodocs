import axios from "axios";
import { toast } from "sonner";

const trimQuotationMarks = (str: string): string => {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }
  return str;
};

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error?.response;
    const errors = err?.data?.errors;
    if (Array.isArray(errors)) {
      errors.forEach((val) => toast.error(val.description));
    } else if (typeof err?.data.errors === "object") {
      for (const e in err?.data.errors) {
        toast.error(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      toast.error(
        typeof err.data === "object"
          ? trimQuotationMarks(JSON.stringify(err.data.message))
          : err.data.message
      );
    } else if (err?.status === 401) {
      toast.error("Please login");
      window.history.pushState({}, "Logins", "/login");
    } else if (err) {
      toast.error(
        typeof err.data === "object"
          ? trimQuotationMarks(JSON.stringify(err.data.message))
          : err.data.message
      );
    }
  }
};
