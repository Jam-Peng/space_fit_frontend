import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class CartService {
  // 取得localStorage購賣課程清單
  getOrderCourse() {
    return JSON.parse(localStorage.getItem("orderCourse"));
  }

  // 刪除localStorage的購買清單
  logout() {
    localStorage.removeItem("orderCourse");
  }

  // 完成購買課程產生訂單
  generateOrder(token, formData, public_id) {
    return axios.post(`${API_URL}/client/order/${public_id}/api/v1`, formData, {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CartService();
