import axios from "axios";
import { CrudService } from "@gits-id/ui";

const BASE_API = import.meta.env.VITE_BASE_URL;

export class ElementaryService extends CrudService {
  getAllQuests() {
    return axios.get(`${BASE_API}/api/mces`);
  }
  getQuest(id) {
    return axios.get(`${BASE_API}/api/mces/${id}`);
  }
  editQuest(id, data) {
    return axios.patch(`${BASE_API}/api/mces/${id}`, data);
  }
  answerQuest(id, data) {
    return axios.patch(`${BASE_API}/api/mces/answer/${id}`, data);
  }
  resetQuests() {
    return axios.patch(`${BASE_API}/api/mces/reset/all`);
  }

  getMeta() {
    return axios.get(`${BASE_API}/api/mcesm`);
  }
  resetMeta() {
    return axios.patch(`${BASE_API}/api/mcesm/reset`);
  }
  upRes(data) {
    return axios.patch(`${BASE_API}/api/mcesm/upres`, data);
  }
  upMod(data) {
    return axios.patch(`${BASE_API}/api/mcesm/upmod`, data);
  }
  upLess(data) {
    return axios.patch(`${BASE_API}/api/mcesm/upless`, data);
  }
  upDiag(data) {
    return axios.patch(`${BASE_API}/api/mcesm/updiag`, data);
  }

  getAllContestants() {
    return axios.get(`${BASE_API}/api/mcesc`);
  }
  editScore(data) {
    return axios.patch(`${BASE_API}/api/mcesc/update/score`, data);
  }
  resetContestants() {
    return axios.patch(`${BASE_API}/api/mcesc/reset/all`);
  }
}
