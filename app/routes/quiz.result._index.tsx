import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getAllQuestions } from "~/models/queries.server";
import { commitSession, getSession } from "~/models/session.server";

// Redirect from here to the determined result page
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userAnswers = session.get("answers");
  if (!userAnswers) return redirect("/quiz");

  const { questions } = await getAllQuestions();
  const allAnswers = questions.flatMap((question) => question.answers);
  const answers = Object.values(userAnswers!).map(
    (answer) => allAnswers.find((a) => a._key === answer)!
  );
  const weights = answers
    .flatMap((answer) => answer.weights)
    .reduce((acc, weight) => {
      return {
        ...acc,
        [weight.type]: (acc[weight.type] ?? 0) + weight.value,
      };
    }, {} as Record<string, number>);
  // find the maximum weighted type
  const typeSlug = Object.entries(weights).sort(
    ([_, a], [__, b]) => b - a
  )[0][0];
  return redirect(`/quiz/result/${typeSlug}`, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
