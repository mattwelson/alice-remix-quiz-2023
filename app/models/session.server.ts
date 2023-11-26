import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  answers: Record<string, string>;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "strict",
      secrets: [process.env.SESSION_SECRET!],
      // Allow the cookies to work on http for development - but not production
      secure: process.env.NODE_ENV != "development",
    },
  });

export { getSession, commitSession, destroySession };
