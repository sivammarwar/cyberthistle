import type { Metadata } from "next";
import "./globals.css";
import "./cookie.css";
import "./hero.css";
import "./waitlist.css";
import "./footer.css";
import "./logo.css";
import "./leadership.css";
import "./products.css";
import "./about.css";
import "./hero-ticker.css";
import "./mega-menu.css";
import "./services.css";
import "./labels.css";
import { SmoothScroll } from "./smooth-scroll";

export const metadata: Metadata = { title: "Cyber Thistle | Secure solutions, seamless experiences", description: "Enterprise cybersecurity, built around the way people work." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SmoothScroll />{children}</body></html>; }
