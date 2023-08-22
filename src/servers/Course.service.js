import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class CourseService {
  // 取得所有課程
  getCourses() {
    return axios.get(`${API_URL}/client/courses/api/v1`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new CourseService();
