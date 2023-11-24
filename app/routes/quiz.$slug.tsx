import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Question } from "~/components/question";
import { getAllQuestions, getQuestion } from "~/models/queries.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  // check slug is a valid int, if not 404
  const { questions } = await getAllQuestions();

  // check slug is a valid index, if not 404
  const questionId = questions[parseInt(slug!, 10) - 1]._id;
  const question = await getQuestion(questionId);

  // TODO: add some indicator of question progress
  return json({ question });
}

export async function action({ request, params }: ActionFunctionArgs) {
  // add answer to the cookie
  const formData = await request.formData();
  const answer = formData.get("answer");
  console.log({ answer });
  // check if there's more questions
  const questionIndex = parseInt(params.slug!, 10);
  const { questions } = await getAllQuestions();
  const nextQuestion =
    questions.length > questionIndex ? questions[questionIndex] : null;
  console.log(nextQuestion, questionIndex, questions.length);
  // redirect to next question
  if (nextQuestion) return redirect(`/quiz/${questionIndex + 1}`);
  // or redirect to /quiz/result
  // that will calculate the result then redirect to the correct hike type!
  return redirect("/quiz/result");
}

export default function Quiz() {
  const { question } = useLoaderData<typeof loader>();

  return (
    <div>
      <Question question={question} />
    </div>
  );
}
