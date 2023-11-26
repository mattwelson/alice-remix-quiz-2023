import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/models/session.server";

// redirect to the "first question" in the quiz
export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: consider making this the _id of the questions... so I'm not working with both index and id
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/quiz/1", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
