import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

// redirect to the "first question" in the quiz
export function loader(args: LoaderFunctionArgs) {
  // TODO: consider making this the _id of the questions... so I'm not working with both index and id
  return redirect("/quiz/1");
}
