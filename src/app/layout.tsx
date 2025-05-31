import type { Metadata } from "next";
import { Inter, Inter as Inter_Mono, Londrina_Shadow } from "next/font/google";
import "./globals.css";

const londrina = Londrina_Shadow({
    variable: "--font-londrina",
    subsets: ["latin"],
    weight: "400",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const interMono = Inter_Mono({
    variable: "--font-inter-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SUS Network",
    description:
        "Let's create a network for the first YC AI Startup School attendees!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${interMono.variable} ${londrina.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
