import Api from "@/api/api";

export class UserService {
  async login(data) {
    try {
      return await Api.post(`/users/login`, data);
    } catch (err) {
      return err.response;
    }
  }
  async sendmail(data) {
    try {
      return await Api.post("/users/sendmail", data);
    } catch (err) {
      return err.response;
    }
  }
  async reset(id, token, data) {
    try {
      return await Api.patch(`/users/reset/${id}/${token}`, data);
    } catch (err) {
      return err.response;
    }
  }
  async edit(id, data) {
    try {
      return await Api.patch(`/users/update/${id}`, data);
    } catch (err) {
      return err.response;
    }
  }
  async logout() {
    try {
      return await Api.get("/users/logout");
    } catch (err) {
      return err.response;
    }
  }
}
