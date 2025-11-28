// app/mtc-user/dashboard/Samar/layout.tsx
import { ReactNode } from "react";

export const metadata = {
  title: "MTC Referred Child List",
  description: "A tool to view and filter MTC referred child data",
};

export default function SamarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="samar-layout">
      <main className="samar-main">
        {children}
      </main>
    </div>
  );
}