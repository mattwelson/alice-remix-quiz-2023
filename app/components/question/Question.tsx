import type { getQuestion } from "~/models/queries.server";
import { Answer } from "./Answer";
import { Form } from "@remix-run/react";

export function Question({
  question,
  isSubmitting,
  error,
}: {
  question: Awaited<ReturnType<typeof getQuestion>>;
  isSubmitting: boolean;
  error?: string;
}) {
  return (
    <Form method="POST">
      <input type="hidden" name="question" value={question._id} />
      <div className="card mx-auto bg-primary text-primary-content max-w-lg shadow-lg">
        <div className="card-body">
          <h2 className="card-title">{question.text}</h2>
          <div className="grid gap-4">
            {question.answers.map((answer) => (
              <Answer answer={answer} key={answer._key} />
            ))}
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="shadow btn" type="submit">
              {!isSubmitting ? "Next" : "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
