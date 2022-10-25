import axios from "axios";
import { CrudService } from "@gits-id/ui";

const BASE_API = import.meta.env.VITE_BASE_URL;

export class SeniorService extends CrudService {
  getAllQuests() {
    return axios.get(`${BASE_API}/api/mcshs`);
  }
  getQuest(id) {
    return axios.get(`${BASE_API}/api/mcshs/${id}`);
  }
  editQuest(id, data) {
    return axios.patch(`${BASE_API}/api/mcshs/${id}`, data);
  }
  answerQuest(id, data) {
    return axios.patch(`${BASE_API}/api/mcshs/answer/${id}`, data);
  }
  resetQuests() {
    return axios.patch(`${BASE_API}/api/mcshs/reset/all`);
  }

  getMeta() {
    return axios.get(`${BASE_API}/api/mcshsm`);
  }
  resetMeta() {
    return axios.patch(`${BASE_API}/api/mcshsm/reset`);
  }
  upRes(data) {
    return axios.patch(`${BASE_API}/api/mcshsm/upres`, data);
  }
  upMod(data) {
    return axios.patch(`${BASE_API}/api/mcshsm/upmod`, data);
  }
  upLess(data) {
    return axios.patch(`${BASE_API}/api/mcshsm/upless`, data);
  }
  upDiag(data) {
    return axios.patch(`${BASE_API}/api/mcshsm/updiag`, data);
  }

  getAllContestants() {
    return axios.get(`${BASE_API}/api/mcshsc`);
  }
  editScore(data) {
    return axios.patch(`${BASE_API}/api/mcshsc/update/score`, data);
  }
  resetContestants() {
    return axios.patch(`${BASE_API}/api/mcshsc/reset/all`);
  }
}
