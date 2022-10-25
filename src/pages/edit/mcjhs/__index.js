import axios from "axios";
import { CrudService } from "@gits-id/ui";

const BASE_API = import.meta.env.VITE_BASE_URL;

export class JuniorService extends CrudService {
  getAllQuests() {
    return axios.get(`${BASE_API}/api/mcjhs`);
  }
  getQuest(id) {
    return axios.get(`${BASE_API}/api/mcjhs/${id}`);
  }
  editQuest(id, data) {
    return axios.patch(`${BASE_API}/api/mcjhs/${id}`, data);
  }
  answerQuest(id, data) {
    return axios.patch(`${BASE_API}/api/mcjhs/answer/${id}`, data);
  }
  resetQuests() {
    return axios.patch(`${BASE_API}/api/mcjhs/reset/all`);
  }

  getMeta() {
    return axios.get(`${BASE_API}/api/mcjhsm`);
  }
  resetMeta() {
    return axios.patch(`${BASE_API}/api/mcjhsm/reset`);
  }
  upRes(data) {
    return axios.patch(`${BASE_API}/api/mcjhsm/upres`, data);
  }
  upMod(data) {
    return axios.patch(`${BASE_API}/api/mcjhsm/upmod`, data);
  }
  upLess(data) {
    return axios.patch(`${BASE_API}/api/mcjhsm/upless`, data);
  }
  upDiag(data) {
    return axios.patch(`${BASE_API}/api/mcjhsm/updiag`, data);
  }

  getAllContestants() {
    return axios.get(`${BASE_API}/api/mcjhsc`);
  }
  editScore(data) {
    return axios.patch(`${BASE_API}/api/mcjhsc/update/score`, data);
  }
  resetContestants() {
    return axios.patch(`${BASE_API}/api/mcjhsc/reset/all`);
  }
}
