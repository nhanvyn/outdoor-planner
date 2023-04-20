import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  toast.success(message, {
    autoClose: 2000,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    autoClose: 2000,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
