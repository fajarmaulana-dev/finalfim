import Api from './api';

export class ContestService {
  async getData(params: any) {
    try {
      return await Api.get(`/contest`, {params});
    } catch (err: any) {
      return err.response;
    }
  }
  async getQuests(params: any) {
    try {
      return await Api.get(`/contest/quest`, {params});
    } catch (err: any) {
      return err.response;
    }
  }
  async getQuest(idx: any, params: any) {
    try {
      return await Api.get(`/contest/quest/${idx}`, {params});
    } catch (err: any) {
      return err.response;
    }
  }
  async setAnswer(data: any) {
    try {
      return await Api.patch(`/contest`, data);
    } catch (err: any) {
      return err.response;
    }
  }
  async setPoint(data: any) {
    try {
      return await Api.patch(`/contest/point`, data);
    } catch (err: any) {
      return err.response;
    }
  }
  async reset(level: any) {
    try {
      return await Api.patch(`/contest/reset?is=${level}`);
    } catch (err: any) {
      return err.response;
    }
  }
  async update(data: any) {
    try {
      return await Api.patch(`/contest/update`, data);
    } catch (err: any) {
      return err.response;
    }
  }
  async resetOne(idx: any, level: any) {
    try {
      return await Api.patch(`/contest/reset/${idx}?is=${level}`);
    } catch (err: any) {
      return err.response;
    }
  }
}
