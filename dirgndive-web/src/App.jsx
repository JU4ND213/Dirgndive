import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';

// --- SUBCOMPONENTES DE LA PANTALLA DE CARGA (SPLASH) ---

const ServiceIcon = ({ icon, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="flex flex-col items-center justify-center gap-4 px-8 border-r border-white/10 last:border-r-0"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-brand-blue">
      {icon}
    </div>
    <span className="text-[0.6rem] sm:text-xs font-bold text-center uppercase tracking-widest text-brand-light w-24 sm:w-28 leading-tight">
      {label}
    </span>
  </motion.div>
);

const SplashScreen = () => {
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
  };
  const letterAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 bg-brand-bg flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-dark/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="flex flex-col items-center mb-24 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <motion.img 
            src="/logo.png" alt="Dirgndive Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div 
          className="flex text-4xl md:text-6xl font-bold tracking-[0.3em] mb-6 text-white ml-[0.3em]"
          variants={letterContainer} initial="hidden" animate="visible"
        >
          {"DIRGNDIV".split("").map((char, index) => (
            <motion.span key={index} variants={letterAnim}>{char}</motion.span>
          ))}
          <motion.span variants={letterAnim} className="text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-primary">E</motion.span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
          className="text-[0.7rem] md:text-sm font-medium tracking-[0.2em] text-brand-light uppercase text-center"
        >
          Tecnología que <span className="text-brand-primary font-bold">evoluciona</span> contigo.
        </motion.p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap justify-center items-center mt-8 z-10 w-full max-w-4xl px-4">
        <ServiceIcon delay={1.8} label="Apps Móviles" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>} />
        <ServiceIcon delay={2.0} label="Páginas Web" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>} />
        <ServiceIcon delay={2.2} label="Soporte Técnico" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>} />
        <ServiceIcon delay={2.4} label={<>Venta y<br/>Mantenimiento<br/>de Equipos</>} icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>} />
      </div>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL (HERO) ---

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // El Splash Screen dura 4.5 segundos antes de desaparecer
    const timer = setTimeout(() => setShowSplash(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      {/* AnimatePresence gestiona la salida animada del Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {/* Contenido Principal (solo se ve cuando el Splash se va) */}
      {!showSplash && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="min-h-screen bg-brand-bg font-sans relative overflow-hidden"
        >
          {/* Fondo de red neuronal / ondas sutiles */}
          <div 
            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(36, 16, 47, 0.4) 0%, transparent 40%)
              `
            }}
          />

          {/* NAVBAR */}
          <nav className="relative z-20 pt-8 pb-4">
            <div className="container mx-auto px-8 lg:px-16 flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img src="/logo.png" alt="Dirgndive Logo" className="w-8 h-8 object-contain" />
                <span className="text-lg font-bold tracking-[0.2em] text-white">DIRGNDIVE</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center gap-10 text-[0.7rem] font-semibold text-brand-light/80 uppercase tracking-widest"
              >
                <div className="hidden md:flex gap-10">
                  <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
                  <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
                  <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
                  <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
                </div>
                <button className="text-brand-light hover:text-white transition-colors">
                  <Menu size={24} strokeWidth={2} />
                </button>
              </motion.div>
            </div>
          </nav>

          {/* HERO SECTION */}
          <main className="container mx-auto px-8 lg:px-16 pt-20 lg:pt-32 pb-24 flex flex-col lg:flex-row items-center justify-between relative z-10 min-h-[80vh]">
            <motion.div 
              className="lg:w-[55%] z-10"
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
              }}
            >
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-[4.2rem] font-bold leading-[1.15] tracking-tight mb-10 text-white">
                Soluciones <br /> tecnológicas que <br /> impulsan <span className="text-brand-primary">tu mundo.</span>
              </motion.h1>
              
              <motion.div variants={fadeUp}>
                <button className="px-10 py-3.5 rounded-full border border-brand-primary text-brand-primary text-sm font-semibold tracking-wide bg-brand-bg/50 hover:bg-brand-primary hover:text-white transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                  Conoce más
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="lg:w-[45%] mt-16 lg:mt-0 relative flex justify-end items-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/20 blur-[120px] rounded-full -z-10" />
              <img 
                src="/hero-devices.png" 
                alt="Dispositivos Dirgndive" 
                className="w-full max-w-[600px] object-contain relative z-10"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x600/11051F/8B5CF6?text=Imagen+hero-devices.png";
                }}
              />
            </motion.div>
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;