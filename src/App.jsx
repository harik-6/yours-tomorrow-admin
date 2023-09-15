import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Questions from "./pages/questions";
//exam related routes
import Exams from "./pages/exams";
import CreateNewExam from "./pages/exams/create-new-exam";
import ExamList from "./pages/exams/exam-list";
import ExamDetails from "./pages/exams/exam-details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="exams" element={<Exams />}>
            <Route path="new" element={<CreateNewExam />} />
            <Route path=":examId" element={<ExamDetails />} />
            <Route path="" element={<ExamList />} />
          </Route>
          <Route path="questions" element={<Questions />} />
          <Route path="*" element={<Navigate to="" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
