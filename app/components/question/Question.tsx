import type { getQuestion } from "~/models/queries.server";

export function Question({
  question,
}: {
  question: Awaited<ReturnType<typeof getQuestion>>;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">{question.text}</h2>
      <form method="POST">
        {question.answers.map((answer) => (
          <div key={answer._key}>
            <label>
              <input
                type="radio"
                name="answer"
                value={answer._key}
                className="mr-2"
              />
              {answer.text}
            </label>
          </div>
        ))}
        <button className="btn" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}
