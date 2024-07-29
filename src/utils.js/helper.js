import { toast } from "react-toastify";


export const errorRequestHandel = ({ error }) => {
    // toast.error(error.message);
    if (error?.response?.status === 422) {
      const err = error.response.data.errors;
      toast.error(err[Object.keys(err)[0]]);
    } else if (error?.response?.status === 400) {
      toast.error(error?.response?.data?.message ?? error?.response?.data?.error);
    } else if (error?.response?.status === 401) {
    //   Store.dispatch(_logout());
    //   Store.dispatch(_clearCartItems());
    //   Store.dispatch(_phoneNumberSet(false));
      window.location.href = "/";
    } else if (error?.response?.status === undefined) {
      toast.error("Server down temporarily");
    } else {
      toast.error(error?.response?.data?.message ?? error?.response?.data?.error);
    }
    return null;
  };