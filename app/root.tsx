import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { FaInstagram } from "react-icons/fa/index.js";

import "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en" data-theme="sunset">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="bg-info text-info-content mb-4 p-4 grid grid-cols-wrapper [&>*]:col-start-2">
          <div className="flex justify-between">
            <a
              className="font-serif text-xl"
              target="_blank"
              rel="noreferrer"
              href="https://aliceadventuring.com"
            >
              Alice Adventuring
            </a>
            <a
              className="font-serif text-3xl"
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/alice.adventuring/"
            >
              <FaInstagram />
            </a>
          </div>
        </header>
        <div className="grid gap-4 grid-cols-wrapper [&>*]:col-start-2">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
