import jwtDecode from "jwt-decode";

class Local {
  getLocalData(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  setLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  removeLocalData(key) {
    localStorage.removeItem(key);
  }
  isTokenExpired(token) {
    const decoded = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  }
}

export default new Local();
