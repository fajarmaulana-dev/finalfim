import {reactive} from 'vue';
import Local from './local';
import {AuthService} from './authend';

export const useAuth = () => {
  const service = new AuthService();
  const message = reactive({
    success: '',
    warning: '',
  });
  const toast = reactive({
    success: false,
    warning: false,
  });

  const composs = (res: any) => {
    message.success = '';
    message.warning = '';
    if (res.data.data) Local.setLocalData('user', res.data.data);
    if (res.status < 300) {
      toast.success = true;
      message.success = res.data.message;
    } else {
      toast.warning = true;
      message.warning = res.data.message;
    }
  };

  const login = async (data: any) => composs(await service.login(data));
  const sendmail = async (data: any) => composs(await service.sendmail(data));
  const reset = async (id: string, token: string, data: any) =>
    composs(await service.reset(id, token, data));
  const update = async (id: string, data: any) =>
    composs(await service.update(id, data));

  return {
    message,
    toast,
    login,
    sendmail,
    reset,
    update,
  };
};
