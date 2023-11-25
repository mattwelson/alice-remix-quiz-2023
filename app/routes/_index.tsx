import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Hiker Type - Alice Adventuring" },
    { name: "description", content: "What type of hiker are you?" },
  ];
};

export default function Index() {
  return (
    <div className="prose">
      <h1>Hiker Type</h1>
      <p>What type of hiker are you?</p>
      <p>
        <a href="/quiz" className="btn btn-primary">
          Take the quiz!
        </a>
      </p>
    </div>
  );
}
