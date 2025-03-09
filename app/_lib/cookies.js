import { parseCookies, setCookie, destroyCookie } from "nookies";

export function setToken(token) {
  setCookie(null, "token", token, {
    path: "/",
    secure: true,
    sameSite: "none",
  });
}

export function getToken() {
  const cookies = parseCookies();
  return cookies.token;
}

export function removeToken() {
  destroyCookie(null, "token", { path: "/" });
}
