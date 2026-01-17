import type { ReactNode } from "react";
import "../index.css";
import "../App.css";

export const metadata = {
  title: "Moonlit Elegance Kittens",
  description: "Premium cattery offering healthy, home-raised kittens.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

