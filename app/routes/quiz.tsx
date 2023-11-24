import { Outlet } from "@remix-run/react";

export default function QuizPage() {
  return (
    <div>
      <h1>QUIZ</h1>
      <Outlet />
    </div>
  );
}
