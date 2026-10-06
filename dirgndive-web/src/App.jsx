import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Smartphone, Globe, Headset, Monitor } from 'lucide-react';

// --- VARIANTES REUTILIZABLES (fuera de los componentes para no recrearlas en cada render) ---

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const letterContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
};

const letterAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- RAYOS DE LUZ DE LAS ESQUINAS (SVG estático, sin blur = cero lag) ---

const LightRays = ({ mirrored = false, colorClass, className = '' }) => {
  // useId genera un id único por instancia (para que los degradados no se mezclen)
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <svg
      viewBox="0 0 500 260"
      fill="none"
      preserveAspectRatio="xMinYMax meet"
      className={`absolute bottom-0 ${mirrored ? 'right-0 -scale-x-100' : 'left-0'} w-[45%] max-w-[640px] h-auto pointer-events-none z-0 ${colorClass} ${className}`}
    >
      <defs>
        {/* Degradado: brillante en la esquina, se desvanece hacia afuera */}
        <linearGradient id={`${id}-beam`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="500" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.45" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Haces de luz */}
      <g stroke={`url(#${id}-beam)`} strokeLinecap="round">
        <path d="M0 260 L500 105" strokeWidth="1.5" />
        <path d="M0 260 L500 160" strokeWidth="1" />
        <path d="M0 260 L500 215" strokeWidth="0.75" />
        <path d="M0 255 L380 20" strokeWidth="1" />
        <path d="M0 260 L250 0" strokeWidth="0.75" />
      </g>

      {/* Relámpagos en zigzag (laten suave) */}
      <g
        className="animate-pulse"
        stroke={`url(#${id}-beam)`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 260 L120 195 L100 190 L190 125 L170 120 L250 62" />
        <path d="M150 260 L240 215 L222 209 L330 168 L312 162 L410 128" />
      </g>

      {/* Puntas brillantes */}
      <circle cx="250" cy="62" r="2.5" fill="currentColor" />
      <circle cx="410" cy="128" r="2.5" fill="currentColor" />
    </svg>
  );
};

// --- SUBCOMPONENTES DE LA PANTALLA DE CARGA (SPLASH) ---

const ServiceIcon = ({ icon, label, delay, colorClass }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="flex flex-col items-center justify-start gap-4 px-6 sm:px-8 border-r border-white/10 last:border-r-0"
  >
    <div className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center ${colorClass}`}>
      {icon}
    </div>
    <span className="text-[0.6rem] sm:text-xs font-bold text-center uppercase tracking-widest text-brand-light w-24 sm:w-32 leading-tight">
      {label}
    </span>
  </motion.div>
);

const SplashScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 bg-brand-bg flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-dark/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Rayos de luz en las esquinas inferiores */}
      <LightRays colorClass="text-brand-primary" className="opacity-80" />
      <LightRays mirrored colorClass="text-brand-blue" className="opacity-80" />

      <div className="flex flex-col items-center mb-16 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <motion.img 
            src="/logo.png" alt="Dirgndive Logo" 
            className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div 
          className="flex text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[0.2em] mb-6 text-white ml-[0.2em]"
          variants={letterContainer} initial="hidden" animate="visible"
        >
          {"DIRGNDIV".split("").map((char, index) => (
            <motion.span key={index} variants={letterAnim}>{char}</motion.span>
          ))}
          <motion.span variants={letterAnim} className="text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-primary">E</motion.span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
          className="text-[0.7rem] md:text-base font-medium tracking-[0.25em] text-brand-light uppercase text-center"
        >
          Tecnología que <span className="text-brand-primary font-bold">evoluciona</span> contigo.
        </motion.p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap justify-center items-stretch mt-4 z-10 w-full max-w-4xl px-4">
        <ServiceIcon
          delay={1.8}
          label="Apps Móviles"
          colorClass="text-brand-primary"
          icon={<Smartphone className="w-full h-full" strokeWidth={1.75} />}
        />
        <ServiceIcon
          delay={2.0}
          label="Páginas Web"
          colorClass="text-brand-blue"
          icon={<Globe className="w-full h-full" strokeWidth={1.75} />}
        />
        <ServiceIcon
          delay={2.2}
          label="Soporte Técnico"
          colorClass="text-brand-primary"
          icon={<Headset className="w-full h-full" strokeWidth={1.75} />}
        />
        <ServiceIcon
          delay={2.4}
          label={<>Venta y<br/>Mantenimiento<br/>de Equipos</>}
          colorClass="text-brand-blue"
          icon={<Monitor className="w-full h-full" strokeWidth={1.75} />}
        />
      </div>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL (HERO) ---

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // 1. El truco anti-lag: le damos 150ms al navegador para que pinte
  // los blur y drop-shadows antes de empezar a calcular animaciones.
  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(readyTimer);
  }, []);

  // 2. El Splash Screen dura 4.5 segundos, contados desde que la página está lista
  useEffect(() => {
    if (!isReady) return;
    const splashTimer = setTimeout(() => setShowSplash(false), 4500);
    return () => clearTimeout(splashTimer);
  }, [isReady]);

  // Mientras respira esos 150ms, mostramos solo el fondo oscuro liso (cero lag)
  if (!isReady) return <div className="min-h-screen bg-brand-bg"></div>;

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
          {/* Fondo de resplandores sutiles */}
          <div 
            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(36, 16, 47, 0.4) 0%, transparent 40%)
              `
            }}
          />

          {/* Rayos de luz de fondo (esquinas inferiores) */}
          <LightRays colorClass="text-brand-primary" className="opacity-50" />
          <LightRays mirrored colorClass="text-brand-blue" className="opacity-50" />

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
          <main className="container mx-auto px-8 lg:px-16 pt-10 lg:pt-12 pb-24 flex flex-col lg:flex-row items-center justify-between relative z-10 lg:min-h-[80vh]">
            <motion.div 
              className="lg:w-[50%] z-10"
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
              }}
            >
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.2] tracking-tight mb-10 text-white">
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
              className="lg:w-[50%] mt-16 lg:mt-0 relative flex justify-center lg:justify-end items-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/20 blur-[120px] rounded-full -z-10" />
              <motion.img 
                src="/hero-devices.png" 
                alt="Dispositivos Dirgndive" 
                className="w-full max-w-[560px] lg:max-w-[720px] object-contain relative z-10"
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
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