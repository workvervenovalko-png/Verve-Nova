"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "Reviews", href: "/testimonials" },
    { name: "Registry", href: "/registry" },
  ];

  const [typeKey, setTypeKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTypeKey((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll for hash links across pages
  React.useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [pathname]);

  return (
    <div className="fixed top-5 left-0 w-full z-[100] flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto backdrop-blur-2xl bg-white/95 border border-slate-200/90 flex items-center justify-between px-6 lg:px-10 py-3 w-full max-w-[1300px] rounded-full shadow-[0_4px_25px_rgba(15,23,42,0.06)]"
      >
        {/* Logo Section - VNT BRANDING */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group pointer-events-auto mr-4">
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden">
              <img src="/vnt-logo.png" alt="Verve Nova Logo" className="w-9 h-9 object-contain" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex overflow-hidden">
              <span className="text-[13px] font-black text-[#1B67B2] tracking-widest uppercase leading-none group-hover:text-blue-700 transition-colors">
                VERVE NOVA
              </span>
            </div>
            <div className="flex overflow-hidden mt-1.5" key={typeKey}>
              {"TECHNOLOGIES".split("").map((char, i) => (
                <motion.span
                  key={`${typeKey}-${i}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.45em] leading-none"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </Link>

        {/* Links Section - Crisp Light Theme, High Contrast */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-slate-700 hover:text-[#1B67B2] uppercase tracking-[0.14em] transition-colors relative group/link whitespace-nowrap py-1"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1B67B2] group-hover/link:w-full transition-all duration-300" />
            </Link>
          ))}

          {status === "authenticated" ? (
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <Link
                href={session?.user?.role?.toUpperCase() === "ADMIN" ? "/admin" : "/profile"}
                className="relative w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:border-[#1B67B2] transition-all overflow-hidden"
              >
                {session?.user?.image ? (
                  <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[11px] font-black text-[#1B67B2]">
                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </Link>

              {/* Logout Dropdown */}
              <AnimatePresence>
                {showLogout && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 8, x: "-50%" }}
                    className="absolute top-full left-1/2 mt-3 z-[120]"
                  >
                    <button
                      onClick={() => signOut()}
                      className="whitespace-nowrap flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-red-600 uppercase tracking-widest hover:bg-red-50 transition-all shadow-xl"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}

          <Link
            href="/contact"
            className="h-9 px-5 bg-[#1B67B2] hover:bg-[#15538e] text-white text-[10px] font-extrabold uppercase tracking-[0.16em] rounded-full hover:shadow-[0_4px_20px_rgba(27,103,178,0.35)] transition-all active:scale-95 flex items-center justify-center ml-1 whitespace-nowrap shadow-sm"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-800 p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-screen h-screen bg-white/98 backdrop-blur-3xl z-[200] lg:hidden flex flex-col items-center justify-between p-8 overflow-y-auto"
            >
              {/* Close Button Header */}
              <div className="w-full flex justify-between items-center pb-4 border-b border-slate-200">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <img src="/vnt-logo.png" alt="VNT Logo" className="w-9 h-9 object-contain" />
                  <span className="text-sm font-black text-[#1B67B2] tracking-widest">VERVE NOVA</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col items-center gap-6 my-auto py-8 w-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-black text-slate-800 uppercase tracking-[0.2em] hover:text-[#1B67B2] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                {status === "authenticated" && (
                  <div className="flex flex-col items-center gap-4 mt-2 pt-4 border-t border-slate-200 w-full max-w-xs">
                    <Link
                      href={session?.user?.role?.toUpperCase() === "ADMIN" ? "/admin" : "/profile"}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-[#1B67B2] uppercase tracking-widest"
                    >
                      {session?.user?.role?.toUpperCase() === "ADMIN" ? "Admin Portal" : "My Profile"}
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      className="text-sm font-bold text-red-600 uppercase tracking-widest"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-xs h-12 bg-[#1B67B2] hover:bg-[#15538e] text-white font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center shadow-md mt-4"
                >
                  Start a Project
                </Link>
              </div>

              {/* Bottom Details */}
              <div className="w-full pt-4 border-t border-slate-200 text-center">
                <p className="text-[11px] font-semibold text-slate-600">
                  contact@vervenovatech.com • +91 7380663685
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  © {new Date().getFullYear()} Verve Nova Technologies
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
