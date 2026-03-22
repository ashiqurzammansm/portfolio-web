// lib/auth.ts

import { cookies } from "next/headers";

const ADMIN_EMAIL = "sashiqurzamman@gmail.com";
const ADMIN_PASSWORD = "PortfolioAdmin123"; 

export function validateAdmin(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function setAdminSession() {
  cookies().set("admin_session", "true", {
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export function isAdminAuthenticated() {
  return cookies().get("admin_session")?.value === "true";
}

export function clearAdminSession() {
  cookies().delete("admin_session");
}