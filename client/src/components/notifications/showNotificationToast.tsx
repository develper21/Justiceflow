import toast from 'react-hot-toast';
import { CustomToast } from './CustomToast';

export const showNotificationToast = {
  success: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
    toast.custom((t) => <CustomToast t={t} title={title} message={message} type="success" action={action} />, {
      duration: 5000,
      position: 'top-right',
    });
  },
  error: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
    toast.custom((t) => <CustomToast t={t} title={title} message={message} type="error" action={action} />, {
      duration: 6000,
      position: 'top-right',
    });
  },
  warning: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
    toast.custom((t) => <CustomToast t={t} title={title} message={message} type="warning" action={action} />, {
      duration: 5000,
      position: 'top-right',
    });
  },
  info: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
    toast.custom((t) => <CustomToast t={t} title={title} message={message} type="info" action={action} />, {
      duration: 4000,
      position: 'top-right',
    });
  },
};
