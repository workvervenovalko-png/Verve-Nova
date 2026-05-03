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
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Registry", href: "/registry" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Verify", href: "/verify" },
  ];

  const [typeKey, setTypeKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTypeKey(prev => prev + 1);
    }, 8000); // Repeat every 8 seconds
    return () => clearInterval(interval);
  }, []);

  // Fix for anchor links when navigating from other pages
  React.useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          // Small delay to ensure the page has rendered
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [pathname]);

  return (
    <div className="fixed top-6 left-0 w-full z-[100] flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between px-8 md:px-12 py-3 w-full max-w-[1300px] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] specular-glow"
      >
        {/* Logo Section - VNT BRANDING */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group pointer-events-auto mr-8">
          <div className="relative">
            <div className="w-12 h-12 flex items-center justify-center transition-all duration-500 overflow-hidden">
              <img src="/vnt-logo.png" alt="Verve Nova Logo" className="w-11 h-11 object-contain" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex overflow-hidden">
              <span className="text-[14px] font-black text-indigo-400 tracking-widest uppercase leading-none transition-colors">
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
                    ease: "easeOut"
                  }}
                  className="text-[9px] font-bold text-white uppercase tracking-[0.5em] leading-none"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </Link>


        {/* Links Section */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors relative group/link"
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
            <Link href="/careers/auth" className="text-[9px] font-black text-white/40 hover:text-indigo-400 uppercase tracking-[0.3em] transition-colors">
              Login
            </Link>
          )}

          <Link href="/#contact" className="h-10 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all active:scale-95 flex items-center justify-center ml-4 whitespace-nowrap">
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

        {/* Full-Screen Mobile Menu Overhaul */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-screen h-screen bg-[#09090B]/95 backdrop-blur-3xl z-[200] md:hidden flex flex-col items-center justify-between p-12 overflow-hidden"
            >
              {/* Background Accents for depth */}
              <div className="absolute inset-0 mesh-gradient-1 opacity-20 pointer-events-none" />
              <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

              {/* Close Button - positioned to align with nav logo */}
              <div className="w-full flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <img src="/vnt-logo.png" alt="VNT Logo" className="w-20 h-20 object-contain" />
              </motion.div>

              {/* Staggered Links */}
              <motion.div
                className="flex flex-col items-center gap-8 w-full"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                      closed: { opacity: 0, y: 20 }
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl sm:text-3xl font-black text-white/90 uppercase tracking-[0.4em] hover:text-indigo-400 transition-colors relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-500" />
                    </Link>
                  </motion.div>
                ))}

                {status === 'authenticated' ? (
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    className="flex flex-col items-center gap-6 mt-4"
                  >
                    <Link
                      href={session?.user?.role === 'ADMIN' ? '/admin' : '/profile'}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em]"
                    >
                      {session?.user?.role === 'ADMIN' ? "Admin" : "My Profile"}
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      className="text-sm font-black text-red-500/60 uppercase tracking-[0.5em]"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                  >
                    <Link
                      href="/careers/auth"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em]"
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full flex flex-col items-center gap-10"
              >
                <div className="h-px w-20 bg-white/10" />

                <div className="flex flex-col items-center gap-3">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.6em]">Reach Out</span>
                  <a href="mailto:work.vervenova.lko@gmail.com" className="text-[10px] font-bold text-white/40 tracking-wider">work.vervenova.lko@gmail.com</a>
                </div>

                <div className="flex items-center gap-6">
                  {/* Social placeholders for now - matching Footer style */}
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center text-white/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center text-white/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center text-white/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                </div>

                <p className="text-[7px] font-black text-white/10 uppercase tracking-[0.8em] select-none">
                  Verve Nova Technologies
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
