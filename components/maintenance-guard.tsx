"use client";

import React, { useState, useEffect } from "react";
import MaintenancePage from "@/app/maintenance/page";

// Maintenance Target Time: October 14, 2026 at 1:00 PM IST (13:00 IST)
const TARGET_LAUNCH_TIME = new Date("2026-10-14T13:00:00+05:30").getTime();

export function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const evaluateStatus = () => {
      // 1. Check for Founder / Admin Preview bypass
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const hasPreviewQuery = urlParams.get("preview") === "true";
        const hasStoredPreview = localStorage.getItem("vnt_preview_access") === "true";

        if (hasPreviewQuery) {
          localStorage.setItem("vnt_preview_access", "true");
          setIsMaintenanceActive(false);
          return;
        }

        if (hasStoredPreview) {
          setIsMaintenanceActive(false);
          return;
        }

        // Allow admin & auth routes directly
        if (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/careers/auth")) {
          setIsMaintenanceActive(false);
          return;
        }
      }

      // 2. Automated Launch Timer Check (1:00 PM IST)
      const now = Date.now();
      if (now >= TARGET_LAUNCH_TIME) {
        setIsMaintenanceActive(false);
      } else {
        setIsMaintenanceActive(true);
      }
    };

    evaluateStatus();
    const interval = setInterval(evaluateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  // Before 1:00 PM IST, show the live Maintenance & Countdown screen
  if (mounted && isMaintenanceActive) {
    return <MaintenancePage />;
  }

  // After 1:00 PM IST (or with preview bypass), show the full real website!
  return <>{children}</>;
}
