import Api from './api';

export class AuthService {
  async login(data: any) {
    try {
      return await Api.post(`/users/login`, data);
    } catch (err: any) {
      return err.response;
    }
  }
  async sendmail(data: any) {
    try {
      return await Api.post('/users/sendmail', data);
    } catch (err: any) {
      return err.response;
    }
  }
  async reset(id: string, token: string, data: any) {
    try {
      return await Api.patch(`/users/reset?id=${id}&token=${token}`, data);
    } catch (err: any) {
      return err.response;
    }
  }
  async update(id: string, data: any) {
    try {
      return await Api.patch(`/users/update/${id}`, data);
    } catch (err: any) {
      return err.response;
    }
  }
}
