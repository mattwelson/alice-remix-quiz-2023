import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

// redirect to the "first question" in the quiz
export function loader(args: LoaderFunctionArgs) {
  return redirect("/quiz/1");
}
