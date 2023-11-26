import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getHikerType } from "~/models/queries.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const hikerType = await getHikerType(params.type!);
  return json({ hikerType });
}

export default function HikerTypePage() {
  const { hikerType } = useLoaderData<typeof loader>();
  const [isCopied, setIsCopied] = useState(false);

  function toClipboard(hikerType: Awaited<ReturnType<typeof getHikerType>>) {
    navigator.clipboard
      .writeText(
        `I just took the hiking quiz, I'm "${hikerType.title}".\nWhat type of hiker are you? Take the quiz to find out!\n\nhttps://quiz.aliceadventuring.com/`
      )
      .then(() => {
        /* clipboard successfully set */
        setIsCopied(true);
      });
  }

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <div className="prose">
      <h1 className="text-4xl font-bold">{hikerType.title}</h1>
      <button
        className="btn btn-primary"
        onClick={() => toClipboard(hikerType)}
      >
        {isCopied ? "Results copied!" : "Share your results"}
      </button>
      <a className="btn btn-outline btn-primary" href="/quiz">
        Take the quiz again
      </a>
    </div>
  );
}
