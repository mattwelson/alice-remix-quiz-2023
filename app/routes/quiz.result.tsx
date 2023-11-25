import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/models/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const answers = session.get("answers") ?? {};
  return json({ answers });
}

export default function QuizResult() {
  const { answers } = useLoaderData<typeof loader>();
  return (
    <div>
      {Object.entries(answers).map(([questionKey, answerKey]) => (
        <div key={questionKey}>
          {questionKey} - {answerKey}
        </div>
      ))}
    </div>
  );
}
