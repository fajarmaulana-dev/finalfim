import api from "@/api/api";
import { CrudService } from "@gits-id/ui";

export class SeniorService extends CrudService {
  getAllQuests() {
    return api.get(`/mcshs`);
  }
  getQuest(id) {
    return api.get(`/mcshs/${id}`);
  }
  editQuest(id, data) {
    return api.patch(`/mcshs/${id}`, data);
  }
  answerQuest(id, data) {
    return api.patch(`/mcshs/answer/${id}`, data);
  }
  resetQuests() {
    return api.patch(`/mcshs/reset/all`);
  }

  getMeta() {
    return api.get(`/mcshsm`);
  }
  resetMeta() {
    return api.patch(`/mcshsm/reset`);
  }
  upRes(data) {
    return api.patch(`/mcshsm/update`, data);
  }

  getAllContestants() {
    return api.get(`/mcshsc`);
  }
  getContestant(id) {
    return api.get(`/mcshsc/${id}`);
  }
  editScore(data) {
    return api.patch(`/mcshsc/update/score`, data);
  }
  resetContestants() {
    return api.patch(`/mcshsc/reset/all`);
  }
}
