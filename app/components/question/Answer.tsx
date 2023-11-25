import type { getQuestion } from "~/models/queries.server";

export function Answer({
  answer,
}: {
  answer: Awaited<ReturnType<typeof getQuestion>>["answers"][0];
}) {
  return (
    <div className="form-control bg-base-100 text-base-content font-bold rounded shadow p-2">
      <label className="label cursor-pointer justify-start gap-4">
        <input
          type="radio"
          name="answer"
          value={answer._key}
          className="radio checked:bg-primary"
        />
        <span className="label-text">{answer.text}</span>
      </label>
    </div>
  );
}
