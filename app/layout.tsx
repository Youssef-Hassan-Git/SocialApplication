"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider } from "react-redux";
import { store } from "./lib/Redux/ReduxStore";
import AuthRefresh from "./_AuthRefresher/AuthRefresh";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>NextBoard</title>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Toaster position="top-right" />

          <AuthRefresh>
            <div className="min-h-screen flex flex-col">
              <Navbar />
                
              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </div>
          </AuthRefresh>
        </Provider>
      </body>
    </html>
  );
}