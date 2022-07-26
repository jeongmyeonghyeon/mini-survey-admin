import Card from '../Card';

function PreviewSection({ questions }) {
  return (
    <div>
      {questions.map((question, index) => (
        <Card key={index} title={question.title} desc={question.desc}>
          Body
        </Card>
      ))}
    </div>
  );
}

export default PreviewSection;
