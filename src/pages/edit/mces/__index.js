import api from "@/api/api";

export class ElementaryService {
  getAllQuests() {
    return api.get(`/mces`);
  }
  getQuest(id) {
    return api.get(`/mces/${id}`);
  }
  editQuest(id, data) {
    return api.patch(`/mces/${id}`, data);
  }
  answerQuest(id, data) {
    return api.patch(`/mces/answer/${id}`, data);
  }
  resetQuests() {
    return api.patch(`/mces/reset/all`);
  }

  getMeta() {
    return api.get(`/mcesm`);
  }
  resetMeta() {
    return api.patch(`/mcesm/reset`);
  }
  upRes(data) {
    return api.patch(`/mcesm/update`, data);
  }

  getAllContestants() {
    return api.get(`/mcesc`);
  }
  getContestant(id) {
    return api.get(`/mcesc/${id}`);
  }
  editScore(data) {
    return api.patch(`/mcesc/update/score`, data);
  }
  resetContestants() {
    return api.patch(`/mcesc/reset/all`);
  }
}
