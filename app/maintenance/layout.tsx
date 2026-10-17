import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scheduled Maintenance | Verve Nova Technologies",
  description: "Scheduled maintenance window for Verve Nova Technologies cloud infrastructure.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
