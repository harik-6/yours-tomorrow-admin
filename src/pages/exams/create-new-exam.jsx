import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Selector from "../../components/Selector";
import DateTimePicker from "../../components/DateTimePicker";
import ExamService from "../../services/ExamService";
import Notification from "../../components/Notification";
import Constants from "../../contants";

export default function CreateNewExam() {
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    name: "",
    group: "",
    type: "",
    start_time: null,
    end_time: null,
    total_questions: 0,
    duration_in_minutes: 30,
  });
  const [saving, setSavingFlag] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "none",
    message: "",
  });

  const handleFormChange = (e, selector = null) => {
    const key = selector || e.target.name;
    setExam({
      ...exam,
      [key]: e.target.value,
    });
  };

  const handleDateTimeChange = (dateTime, key) => {
    setExam({
      ...exam,
      [key]: dateTime,
    });
  };

  const handleButtonClick = async () => {
    setSavingFlag(true);
    const savedExam = await ExamService.createNewExam(exam);
    if (savedExam == null) {
      setNotification({
        show: true,
        type: Constants.NOTIFICATION.ERROR,
        message: "New exam can not be created",
      });
      setSavingFlag(false);
    } else {
      setNotification({
        show: true,
        type: Constants.NOTIFICATION.SUCCESS,
        message: "Exam created successfully",
      });
    }
    setTimeout(() => navigate("/exams"), 3000);
  };

  return (
    <>
      <Notification {...notification} />
      <TextField
        name="name"
        label="Name of the exam"
        onChange={handleFormChange}
        required
        value={exam["name"]}
      />
      <TextField
        name="description"
        label="Description for the exam"
        onChange={handleFormChange}
        required
        value={exam["description"]}
      />
      <Selector
        onChange={(e) => handleFormChange(e, "group")}
        label="Select group"
        values={Constants.EXAM_GROUPS}
        selected={exam["exam_group"]}
      />
      <Selector
        onChange={(e) => handleFormChange(e, "type")}
        label="Select type"
        values={Constants.EXAM_TYPES}
        selected={exam["exam_type"]}
      />
      <DateTimePicker
        value={exam.start_time}
        onChange={(value) => handleDateTimeChange(value, "start_time")}
        label="Start time of the exam"
      />
      <DateTimePicker
        value={exam.end_time}
        onChange={(value) => handleDateTimeChange(value, "end_time")}
        label="End time of the exam"
      />
      <TextField
        name="duration_in_minutes"
        label="Total duration of the exam"
        disabled
        value={exam.duration_in_minutes + " minutes"}
        onChange={handleFormChange}
      />
      <TextField
        name="total_questions"
        label="No of Questions"
        value={exam.total_questions}
        type="number"
        onChange={handleFormChange}
      />
      <Button
        disabled={saving}
        onClick={handleButtonClick}
        variant="contained"
        disableElevation
      >
        Save Changes
      </Button>
    </>
  );
}
