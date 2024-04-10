import { Inter } from "next/font/google";
import "./globals.css";
import { BotonesGrupo } from "@/components/Botones";
// import { NextScript } from "next/document";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BotonesGrupo />

        {children}
        {/* <NextScript /> */}
        <script src="./observer.js" />
      </body>


    </html>
  );
}
