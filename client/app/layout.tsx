import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "./context/toaster-context";
import "./globals.css";
import { ReduxProviders } from "./redux/provider";
import ActiveStatus from "./components/active-status";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Messenger",
    description: "Messgenger clone",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProviders>
                    <ToasterContext />
                    <ActiveStatus />
                    {children}
                </ReduxProviders>
            </body>
        </html>
    );
}
