import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-providers";
import { AuthProvider } from "@/auth/context/auth-provider";
import { Public_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Aawiz",
  description: "Aawiz Dashboard",
};

const primaryFont = Public_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
