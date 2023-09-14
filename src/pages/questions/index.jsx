import { styled } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Utils from "../../utils";
import PageView from "../../components/PageView";

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

export default function Questions() {
  const handleFileUpload = (event) => {
    Utils.fileToJsonArray(event.target.files[0]);
  };

  return (
    <PageView>
      <Typography variant="h5" gutterBottom>
        Upload your question paper
      </Typography>
      <Button
        component="label"
        variant="contained"
        sx={{
          height: "64px",
          width: "50%",
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
    </PageView>
  );
}
