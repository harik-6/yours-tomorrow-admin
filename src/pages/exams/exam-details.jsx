import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ExamService from "../../services/ExamService";
import UploadFile from "./upload-file";
import QuestionsList from "../questions/questions-list";

const fields = [
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "Description",
    selector: "name",
  },
  {
    name: "Group",
    selector: "group",
  },
  {
    name: "Type",
    selector: "type",
  },
  {
    name: "Duration (minutes)",
    selector: "duration_in_minutes",
  },
  {
    name: "Total questions",
    selector: "total_questions",
  },
];

function Title({ text }) {
  return (
    <Typography sx={{ fontWeight: "bold" }} variant="p" gutterBottom>
      {text}
    </Typography>
  );
}

function SubTitle({ text }) {
  return <Typography variant="p">{text}</Typography>;
}

export default function ExamDetails() {
  const { examId } = useParams();
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    setDetails(await ExamService.getExamDetails(examId));
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, []);

  if (details == null) return <p>No details present</p>;
  const { exam, questions } = details;

  return (
    <>
      <Grid sx={{ marginTop: "8px", padding: "16px" }} container spacing={2}>
        {fields.map((f) => {
          return (
            <Grid item xs={6}>
              <Title text={f.name} />
              <br />
              <SubTitle text={exam[f.selector]} />
            </Grid>
          );
        })}
        <Grid item xs={6}>
          <Title text="Date" />
          <br />
          <SubTitle text={exam["start_time"]} />
        </Grid>
        <Grid item xs={6}>
          <Title text="Time" />
          <br />
          <SubTitle text={exam["end_time"]} />
        </Grid>
      </Grid>
      {questions.length === 0 ? (
        <UploadFile examId={examId} />
      ) : (
        <>
          <hr />
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            Questions
          </Typography>
          <QuestionsList questions={questions} />
        </>
      )}
    </>
  );
}
