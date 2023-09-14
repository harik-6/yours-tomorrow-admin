import { Button, TextField } from "@mui/material";
import PageView from "../../components/PageView";
import { useState } from "react";
import Selector from "../../components/Selector";
import DateTimePicker from "../../components/DateTimePicker";

const defaultExam = {
  name: "Mock exam",
  exam_group: "GROUP1",
  exam_type: "PUBLIC",
};

const examGroups = ["GROUP1", "GROUP2", "GROUP3", "GROUP4"];
const examTypes = ["MOCK", "PUBLIC", "PRIVATE", "PREVIOUS_YEAR"];

export default function Exam() {
  const [exam, setExam] = useState(defaultExam);

  const handleFormChange = (e, selector = null) => {
    const key = selector || e.target.name;
    setExam({
      ...exam,
      [key]: e.target.value,
    });
  };

  const handleButtonClick = () => {
    console.log("new exam to be saved", exam);
  };

  return (
    <PageView>
      <TextField
        name="name"
        label="Exam name"
        onChange={handleFormChange}
        required
        value={exam["name"]}
      />
      <Selector
        onChange={(e) => handleFormChange(e, "exam_group")}
        label="Group"
        values={examGroups}
        selected={exam["exam_group"]}
      />
      <Selector
        onChange={(e) => handleFormChange(e, "exam_type")}
        label="Type"
        values={examTypes}
        selected={exam["exam_type"]}
      />
      <DateTimePicker label="Exam start date time" />
      <DateTimePicker label="Exam start end time" />
      <TextField
        name="name"
        label="Exam duration"
        disabled
        value={10 + " minutes"}
      />
      <TextField
        name="total_questions"
        label="No of Questions"
        value={10}
        type="number"
      />
      <Button onClick={handleButtonClick} variant="contained" disableElevation>
        Save
      </Button>
    </PageView>
  );
}
