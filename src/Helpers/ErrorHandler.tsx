import axios from "axios";
import { toast } from "sonner";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;
    const errors = err?.data?.errors;
    if (Array.isArray(errors)) {
      for (let val of errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      toast.warning(err.data);
    } else if (err?.status == 401) {
      toast.warning("Please login");
      window.history.pushState({}, "Logins", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};
