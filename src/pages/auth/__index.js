import api from "@/api/api";
import { CrudService } from "@gits-id/ui";

export class UserService extends CrudService {
  login(data) {
    return api.post(`/users/login`, data);
  }
  edit(id, data) {
    return api.patch(`/users/update/${id}`, data);
  }
  refresh(data) {
    return api.post("/users/refresh", data);
  }
  sendmail(data) {
    return api.post("/users/sendmail", data);
  }
  reset(id, token, data) {
    return api.patch(`/users/reset/${id}/${token}`, data);
  }
  getEmail() {
    return api.get("/users");
  }
}
