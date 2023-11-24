import { q } from "groqd";
import { runQuery } from "./sanity.server";

export async function getAllQuestions() {
  return runQuery(
    q("*")
      .filterByType("home")
      .slice(0)
      .grab$({
        questions: q("questions")
          .filter()
          .deref()
          .grab$({ _id: q.string(), text: q.string() }),
      })
  );
}

// check slug is a valid index, if not 404
export async function getQuestion(questionId: string) {
  return runQuery(
    q("*")
      .filterByType("question")
      .filter("$questionId == _id")
      .slice(0)
      .grab$({
        _id: q.string(),
        text: q.string(),
        answers: q("answers")
          .filter()
          .grab$({
            _key: q.string(),
            text: q.string(),
            weights: q("weights")
              .filter()
              .grab$({
                value: q.number(),
                type: q("type").deref().grabOne$("slug.current", q.string()),
              }),
          }),
      }),
    { questionId }
  );
}
