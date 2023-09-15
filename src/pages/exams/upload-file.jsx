import { styled } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PageView from "../../components/PageView";
import ExamService from "../../services/ExamService";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function UploadFile({ examId }) {
  const handleFileUpload = async (event) => {
    const response = await ExamService.uploadFile(
      examId,
      event.target.files[0]
    );
    if (response === null) {
      throw new Error("find me");
    }
  };

  return (
    <PageView>
      <Box textAlign="center">
        <Typography variant="h6" gutterBottom>
          No questions added for this exam
        </Typography>
        <Button
          component="label"
          variant="outlined"
          sx={{
            height: "64px",
            width: "50%",
            border: "dashed 2px",
          }}
          startIcon={<CloudUploadIcon />}
          href="#file-upload"
        >
          Upload a file
          <VisuallyHiddenInput
            onChange={handleFileUpload}
            type="file"
            accept=".xlsx, .xls, .csv, .json"
          />
        </Button>
      </Box>
    </PageView>
  );
}
