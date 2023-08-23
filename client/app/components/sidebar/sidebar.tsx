import React from "react";
import DesktopSidebar from "./desktop-sidebar";
import MobileFooter from "./mobile-footer";

export default function Sidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            <main className="lg:pl-20 h-full">
                <DesktopSidebar />
                <MobileFooter />
                {children}
            </main>
        </div>
    );
}
