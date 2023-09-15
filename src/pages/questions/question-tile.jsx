import { Button, Card, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Constants from "../../contants";
import { useState } from "react";

export function QandA({ question, options }) {
  return (
    <>
      <Typography sx={{ fontWeight: "bold" }} variant="p">
        {question.value}
      </Typography>
      <Grid sx={{ marginTop: "8px" }} container spacing={2}>
        {options.map((option, index) => {
          return (
            <Grid key={option.id} item xs={6}>
              <Typography variant="p">
                {`${index + 1}) ${option.value}`}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
export default function QuestionTile({ question }) {
  const [language, setLanguage] = useState(Constants.LANGUAGE.ENGLISH);
  const { question_phrases, options } = question;
  const tamilQ = question_phrases.find(
    (q) => q["language"] === Constants.LANGUAGE.TAMIL
  );
  const tamilOptions = options.filter(
    (q) => q["language"] === Constants.LANGUAGE.TAMIL
  );
  const englishQ = question_phrases.find(
    (q) => q["language"] === Constants.LANGUAGE.ENGLISH
  );
  const englishOptions = options.filter(
    (q) => q["language"] === Constants.LANGUAGE.ENGLISH
  );

  const toggleLanguage = () => {
    if (language === Constants.LANGUAGE.TAMIL)
      setLanguage(Constants.LANGUAGE.ENGLISH);
    else setLanguage(Constants.LANGUAGE.TAMIL);
  };

  return (
    <Card sx={{ padding: "16px" }}>
      {language === Constants.LANGUAGE.TAMIL ? (
        <QandA question={tamilQ} options={tamilOptions} />
      ) : (
        <QandA question={englishQ} options={englishOptions} />
      )}
      <Stack sx={{ marginTop: "8px" }} direction="row" gap="8px">
        <Button
          onClick={toggleLanguage}
          sx={{ marginTop: "16px" }}
          variant="outlined"
          size="small"
        >
          Translate
        </Button>
        <Button
          sx={{ marginTop: "16px" }}
          variant="outlined"
          color="error"
          size="small"
        >
          Remove
        </Button>
      </Stack>
    </Card>
  );
}
