import api from "@/api/api";
import { CrudService } from "@gits-id/ui";

export class JuniorService extends CrudService {
  getAllQuests() {
    return api.get(`/mcjhs`);
  }
  getQuest(id) {
    return api.get(`/mcjhs/${id}`);
  }
  editQuest(id, data) {
    return api.patch(`/mcjhs/${id}`, data);
  }
  answerQuest(id, data) {
    return api.patch(`/mcjhs/answer/${id}`, data);
  }
  resetQuests() {
    return api.patch(`/mcjhs/reset/all`);
  }

  getMeta() {
    return api.get(`/mcjhsm`);
  }
  resetMeta() {
    return api.patch(`/mcjhsm/reset`);
  }
  upRes(data) {
    return api.patch(`/mcjhsm/update`, data);
  }

  getAllContestants() {
    return api.get(`/mcjhsc`);
  }
  getContestant(id) {
    return api.get(`/mcjhsc/${id}`);
  }
  editScore(data) {
    return api.patch(`/mcjhsc/update/score`, data);
  }
  resetContestants() {
    return api.patch(`/mcjhsc/reset/all`);
  }
}
