import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getHikerType } from "~/models/queries.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const hikerType = await getHikerType(params.type!);
  return json({ hikerType });
}

// TODO: someway to destroy session

export default function HikerTypePage() {
  const { hikerType } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{hikerType.title}</h1>
    </div>
  );
}
