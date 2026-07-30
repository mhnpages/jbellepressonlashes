import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Press-On Lashes | J. Belle Cosmetics",
  description:
    "Pestañas autoadhesivas sin pegamento, listas en un minuto y disponibles por WhatsApp.",
  openGraph: {
    title: "J. Belle Press-On Lashes",
    description: "Tu mirada cambia en un minuto.",
    images: ["/assets/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
