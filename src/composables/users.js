import { ref, reactive } from "vue";
import { UserService } from "../pages/auth/__index";
import Local from "../api/local";
import router from "../router";
import { useStore } from "vuex";
const store = useStore();

export const useUser = () => {
  const service = new UserService();
  const message = reactive({
    success: "",
    error: "",
    code: 0,
  });
  const loading = reactive({
    load: false,
  });
  const data = ref();

  const composs = (serv) => {
    loading.load = true;
    const res = serv;
    if (res.data.data) {
      if (res.data.data.token) {
        Local.setLocalData("token", res.data.data.token);
      }
      if (res.data.data.user) {
        Local.setLocalData("user", res.data.data.user);
      }
    }
    if (res.status < 300) {
      message.success = res.data.message;
    } else {
      message.error = res.data.message;
    }
    message.code = res.status;
    loading.load = false;
  };

  const logout = async () => {
    try {
      store.dispatch("logout");
      await service.logout();
      Local.removeLocalData("user");
      Local.removeLocalData("token");
      router.push("/auth/login");
    } catch (err) {
      router.push("/auth/login");
    }
  };

  const login = async (data) => composs(await service.login(data));
  const sendmail = async (data) => composs(await service.sendmail(data));
  const reset = async (id, token, data) =>
    composs(await service.reset(id, token, data));
  const edit = async (id, data) => composs(await service.edit(id, data));

  return {
    message,
    loading,
    login,
    sendmail,
    reset,
    edit,
    logout,
  };
};
