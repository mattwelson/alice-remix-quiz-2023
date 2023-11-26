import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { Question } from "~/components/question";
import { getAllQuestions, getQuestion } from "~/models/queries.server";
import { commitSession, getSession } from "~/models/session.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  // check slug is a valid int, if not 404
  const { questions } = await getAllQuestions();

  // check slug is a valid index, if not 404
  const current = parseInt(slug!, 10);
  const questionId = questions[current - 1]._id;
  const question = await getQuestion(questionId);

  // TODO: add some indicator of question progress
  return json({ question, current, total: questions.length });
}

export async function action({ request, params }: ActionFunctionArgs) {
  // add answer to the cookie
  const formData = await request.formData();
  const answer = formData.get("answer");
  const question = formData.get("question");
  if (!answer || !question)
    return json({ error: "No answer provided" }, { status: 400 });

  const session = await getSession(request.headers.get("Cookie"));

  const answers = session.get("answers") ?? {};
  answers[question as string] = answer as string;
  session.set("answers", answers!);

  // check if there's more questions
  const questionIndex = parseInt(params.slug!, 10);
  const { questions } = await getAllQuestions();
  const nextQuestion =
    questions.length > questionIndex ? questions[questionIndex] : null;
  // redirect to next question
  if (nextQuestion)
    return redirect(`/quiz/${questionIndex + 1}`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  // or redirect to /quiz/result
  // that will calculate the result then redirect to the correct hike type!
  return redirect("/quiz/result", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Quiz() {
  const { question, current, total } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();

  return (
    <div className="mt-8 md:mt-16">
      <Question
        question={question}
        isSubmitting={state === "submitting"}
        error={actionData?.error}
      />
      <div className="text-center my-2 opacity-80">
        {current}/{total}
      </div>
    </div>
  );
}
