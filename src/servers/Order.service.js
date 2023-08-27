import axios from "axios";
const API_URL = "http://127.0.0.1:5000";
// const API_URL = "https://space-fit-server.onrender.com";

class OrderService {
  // 取得使用者所有課程訂單API
  getAllOrders(token, client_id) {
    return axios.post(
      `${API_URL}/client/orders/api/v1`,
      { client_id: client_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default new OrderService();
