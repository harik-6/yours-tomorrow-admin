import { useEffect, useState } from "react";
import ExamService from "../../services/ExamService";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function ExamList() {
  const location = useLocation();
  const [examList, setExamList] = useState([]);

  const fetchAllExam = async () => {
    setExamList(await ExamService.getAllExams());
  };

  useEffect(() => {
    fetchAllExam();
  }, []);

  return (
    <>
      <Link to={`${location.pathname}/new`}>
        <Button variant="contained" disableElevation>
          Create new exam
        </Button>
      </Link>
      {examList.map((exam) => (
        <div key={exam["id"]}>
          <p>{JSON.stringify(exam)}</p>
          <Link to={`${location.pathname}/${exam.id}`}>
            <Button variant="contained" disableElevation>
              Details
            </Button>
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
}
