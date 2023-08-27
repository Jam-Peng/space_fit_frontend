import axios from "axios";
const API_URL = "http://127.0.0.1:5000";
// const API_URL = "https://space-fit-server.onrender.com";

class AuthClientService {
  // 註冊
  register(username, password, email, phone) {
    return axios.post(
      `${API_URL}/client/register/api/v1`,
      {
        username: username,
        password: password,
        email: email,
        phone: phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  // 登入
  login(username, password) {
    return axios.post(
      `${API_URL}/client/login/api/v1`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 登出 - 刪除localStorage的Token
  logout() {
    localStorage.removeItem("client");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("client"));
  }

  // 自動更新Token
  refreshToken(token) {
    return axios.post(
      `${API_URL}/client/refresh_token/api/v1`,
      { token: token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 更新會員資料
  updateAccount(token, formData, public_id) {
    return axios.put(
      `${API_URL}/client/update_account/${public_id}/api/v1`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default new AuthClientService();
