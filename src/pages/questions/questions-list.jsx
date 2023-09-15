import QuestionTile from "./question-tile";

export default function QuestionsList({ questions = [] }) {
  return (
    <>
      {questions.map((q) => (
        <QuestionTile key={q.id} question={q} />
      ))}
    </>
  );
}
