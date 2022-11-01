import TokenService from "@/api/token";
import EventBus from "@/common/eventBus";
import router from "@/router";
import jwtDecode from "jwt-decode";
import { useUser } from "@/composables/users";
const exist = TokenService.getUser();
const logOut = () => {
  store.dispatch("auth/logout");
};

const { refresh } = useUser();

export const noAuth = () => {
  if (!exist) {
    TokenService.removeUser();
    EventBus.on("logout", () => {
      logOut();
    });
    router.push("/auth/login");
    exp = true;
  }
  if (exist) {
    const accessTime = jwtDecode(exist?.accessToken).exp * 1000;
    const refreshTime = jwtDecode(exist?.refreshToken).exp * 1000;
    if (Date.now() < refreshTime && Date.now() >= accessTime - 300000) {
      refresh({
        userId: exist?.userId,
        email: exist?.email,
        refreshToken: exist?.refreshToken,
      });
    }
    if (Date.now() >= refreshTime && Date.now() >= accessTime - 300000) {
      TokenService.removeUser();
      EventBus.on("logout", () => {
        logOut();
      });
      router.push("/auth/login");
    }
  }
};
