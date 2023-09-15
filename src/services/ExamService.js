import axios from "axios";
import Constants from "../contants";
const EXAM_API = Constants.API_URL + "/exams";
const ExamService = {
  createNewExam: async (newexam) => {
    try {
      const response = await axios.post(EXAM_API, newexam);
      if (response.status === 201) return response.data;
      return null;
    } catch (error) {
      return null;
    }
  },
  getAllExams: async () => {
    try {
      const response = await axios.get(EXAM_API);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  getExamDetails: async (examId = null) => {
    if (examId == null) return null;
    try {
      const response = await axios.get(`${EXAM_API}/${examId}/details`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  uploadFile: async (examId, file) => {
    if (examId == null) return null;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${EXAM_API}/${examId}/upload`, formData);
      if (response.status === 201) return "upload successful";
      return response.data;
    } catch (error) {
      return [];
    }
  }
}

export default ExamService;