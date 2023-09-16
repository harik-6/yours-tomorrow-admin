import { Card, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Selector from "../../components/Selector";
import DateTimePicker from "../../components/DateTimePicker";
import ExamService from "../../services/ExamService";
import Notification from "../../components/Notification";
import Constants from "../../contants";
import Utils from "../../utils";
import dayjs from "dayjs";

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
    let diffInMins = 0;
    if (key === "end_time") {
      diffInMins = Utils.getTimeDiffInMinutes(exam.start_time, dateTime);
    } else {
      diffInMins = Utils.getTimeDiffInMinutes(dateTime, exam.end_time);
    }
    setExam({
      ...exam,
      [key]: dayjs(dateTime),
      duration_in_minutes: Math.max(diffInMins, 0),
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
      setTimeout(() => navigate("/exams"), 3000);
    }
  };

  const resetNotification = () => {
    setNotification({
      show: false,
      type: Constants.NOTIFICATION.INFO,
      message: "",
    });
  };

  return (
    <>
      <Notification {...notification} onClose={resetNotification} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center" marginTop="24px">
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                padding: "24px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  textAlign: "center",
                  marginBottom: "48px",
                }}
              >
                Create new exam
              </p>
              <Grid container rowSpacing={6} columnSpacing={4}>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name of the exam"
                    onChange={handleFormChange}
                    required
                    value={exam["name"]}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Description for the exam"
                    onChange={handleFormChange}
                    required
                    value={exam["description"]}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Selector
                    onChange={(e) => handleFormChange(e, "group")}
                    label="Select group"
                    values={Constants.EXAM_GROUPS}
                    selected={exam["exam_group"]}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Selector
                    onChange={(e) => handleFormChange(e, "type")}
                    label="Select type"
                    values={Constants.EXAM_TYPES}
                    selected={exam["exam_type"]}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <DateTimePicker
                    value={exam.start_time}
                    onChange={(value) =>
                      handleDateTimeChange(value, "start_time")
                    }
                    label="Start time of the exam"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <DateTimePicker
                    value={exam.end_time}
                    onChange={(value) =>
                      handleDateTimeChange(value, "end_time")
                    }
                    label="End time of the exam"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="duration_in_minutes"
                    label="Total duration of the exam"
                    disabled
                    value={exam.duration_in_minutes + " minutes"}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="total_questions"
                    label="No of Questions"
                    value={exam.total_questions}
                    type="number"
                    onChange={handleFormChange}
                  />
                </Grid>
              </Grid>
              <Button
                disabled={saving}
                onClick={handleButtonClick}
                variant="contained"
                disableElevation
                sx={{ margin: "24px 0 0 0" }}
              >
                Save Changes
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
