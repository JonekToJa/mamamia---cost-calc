import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mamamia — całodobowa opieka domowa",
  description:
    "Ile kosztuje całodobowa opieka dla Twojej mamy — po odliczeniu dofinansowania. Bezpłatnie, anonimowo, bez rejestracji.",
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
