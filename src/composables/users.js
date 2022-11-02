import { ref } from "vue";
import { UserService } from "../pages/auth/__index";
import router from "../router";
import TokenService from "@/api/token";
const user = TokenService.getUser();

export const useUser = () => {
  const service = new UserService();
  const message = ref([]);
  const loading = ref(false);
  const mails = ref([]);

  const login = async (data) => {
    try {
      loading.value = true;
      const res = await service.login(data);
      loading.value = false;
      message.value = [res?.data.message, 200];
      TokenService.setUser(res.data);
      setTimeout(() => {
        location.assign("/");
      }, 500);
      return res;
    } catch (err) {
      loading.value = false;
      message.value = [err.response?.data.message, 400];
      return err;
    }
  };

  const update = async (id, data) => {
    try {
      loading.value = true;
      const res = await service.edit(id, data);
      message.value = [res?.data.message, 200];
      login({ email: user?.email, password: data?.newPassword });
      return res;
    } catch (err) {
      loading.value = false;
      message.value = [err.response?.data.message, 400];
      return err;
    }
  };

  const refresh = async (data) => {
    try {
      const res = await service.refresh(data);
      message.value = [res?.data.message, 200];
      TokenService.updateLocalAccessToken(res.data.accessToken);
      return res;
    } catch (err) {
      message.value = [err.response?.data.message, 400];
      return err;
    }
  };

  const sendmail = async (data) => {
    try {
      loading.value = true;
      const res = await service.sendmail(data);
      loading.value = false;
      message.value = [res?.data.message, 200];
      return res;
    } catch (err) {
      loading.value = false;
      message.value = [err.response?.data.message, 400];
      return err;
    }
  };

  const reset = async (id, token, data) => {
    try {
      loading.value = true;
      const res = await service.reset(id, token, data);
      loading.value = false;
      message.value = [res?.data.message, 200];
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
      return res;
    } catch (err) {
      loading.value = false;
      message.value = [err.response?.data.message, 400];
      return err;
    }
  };

  const getEmail = async () => {
    try {
      const res = await service.getEmail();
      mails.value = res.data.emails;
      return res;
    } catch (err) {
      message.value = [err.response?.data.message, 400];
      return err;
    }
  };

  return {
    message,
    login,
    update,
    refresh,
    sendmail,
    reset,
    loading,
    mails,
    getEmail,
  };
};
