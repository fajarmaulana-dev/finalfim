import Api from "./api";
import Local from "./local";
import { useUser } from "@/composables/users";
const { logout } = useUser();

const setup = () => {
  Api.interceptors.request.use(
    async (config) => {
      let token = Local.getLocalData("token");
      if (!config.url.includes("users") && Local.isTokenExpired(token)) {
        try {
          const res = await Api.post("/users/refresh");
          Local.setLocalData("token", res.data.data.token);
          token = res.data.data.token;
        } catch (err) {
          if (
            err.message === "Network Error" ||
            err.response.data.message === "Tidak dapat merefresh token."
          ) {
            logout();
          }
          return Promise.reject(err);
        }
      }
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  Api.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export default setup;
