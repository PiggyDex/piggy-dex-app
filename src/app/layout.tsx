import { type Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const BDOGrotesk = localFont({
    src: [
        {
            path: "./BDOGrotesk-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./BDOGrotesk-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
});

export const metadata: Metadata = {
    title: "Piggy DEX",
    description: "Best DEX on Conflux Network",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={BDOGrotesk.className}>{children}</body>
        </html>
    );
}
