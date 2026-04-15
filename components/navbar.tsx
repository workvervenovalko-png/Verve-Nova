"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";


export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isCareersPage = pathname.startsWith("/careers");

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Expertise", href: "/#capabilities" },
    { name: "Industries", href: "/#industries" },
    { name: "Registry", href: "/registry" },
    { name: "Careers", href: "/careers" },
  ];

  const [typeKey, setTypeKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTypeKey(prev => prev + 1);
    }, 8000); // Repeat every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-[100] flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between px-8 py-3 w-full max-w-[1200px] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] specular-glow"
      >
        {/* Logo Section - VNT BRANDING */}
        <Link href="/" className="flex items-center gap-5 shrink-0 group pointer-events-auto">
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-500 overflow-hidden">
                <img src="/icon.svg" alt="Verve Nova Logo" className="w-8 h-8 object-contain brightness-0 invert" />
            </div>
          </div>
          
          <div className="flex flex-col" key={typeKey}>
            <div className="flex overflow-hidden">
              {"VERVE NOVA".split("").map((char, i) => (
                <motion.span
                  key={`${typeKey}-${i}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.1,
                    ease: "easeOut"
                  }}
                  className="text-sm font-black text-white tracking-widest uppercase leading-none group-hover:text-indigo-400 transition-colors"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[7px] font-bold text-white/30 uppercase tracking-[0.5em] mt-1.5 leading-none group-hover:text-white/50 transition-colors"
            >
              Technologies
            </motion.span>
          </div>
        </Link>
        

        {/* Links Section */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors relative group/link"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 group-hover/link:w-full transition-all duration-300" />
            </Link>
          ))}
          {status === 'authenticated' ? (
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <Link 
                href={session?.user?.role === 'ADMIN' ? '/admin' : '/profile'}
                className="relative w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-indigo-500/50 transition-all overflow-hidden"
              >
                {session?.user?.image ? (
                  <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black text-indigo-400">
                      {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </Link>

              {/* Logout Dropdown */}
              <AnimatePresence>
                {showLogout && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 10, x: '-50%' }}
                    className="absolute top-full left-1/2 mt-4 z-[120]"
                  >
                    <button
                      onClick={() => signOut()}
                      className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-[#111113] border border-white/[0.08] rounded-xl text-[9px] font-black text-red-400 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-2xl glass-card"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            isCareersPage && (
              <Link href="/careers/auth" className="text-[9px] font-black text-white/40 hover:text-indigo-400 uppercase tracking-[0.3em] transition-colors">
                Login
              </Link>
            )
          )}

          <Link href="/#contact" className="h-10 px-10 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all active:scale-95 flex items-center justify-center">
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile menu - refined for robustness */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[400px] bg-[#111113]/98 backdrop-blur-3xl mt-4 p-10 flex flex-col items-center gap-8 rounded-[2.5rem] border border-white/[0.08] shadow-[0_32px_64px_rgba(0,0,0,0.6)] z-[200]"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] font-black text-white/80 uppercase tracking-[0.4em] hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {status === 'authenticated' ? (
                <>
                  <Link
                    href={session?.user?.role === 'ADMIN' ? '/admin' : '/profile'}
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]"
                  >
                    {session?.user?.role === 'ADMIN' ? "Admin Portal" : "My Profile"}
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="text-[10px] font-black text-red-400 uppercase tracking-[0.5em]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                isCareersPage && (
                  <Link
                    href="/careers/auth"
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]"
                  >
                    Login
                  </Link>
                )
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
