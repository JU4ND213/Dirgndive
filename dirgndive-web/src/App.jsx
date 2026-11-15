import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Smartphone,
  Globe,
  Headset,
  Monitor,
  Wrench,
  ShoppingBag,
  Brain,
  Rocket,
  ShieldCheck,
  Settings,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Send,
  MapPin,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = '8e8cc661-6e77-47c6-94b6-d4c104c08152'; // Pega aquí tu Access Key de Web3Forms
const WHATSAPP_NUMBER = '593995982046'; // Pon tu número con código de país (ej. 593987654321 sin el +)

// --- VARIANTES REUTILIZABLES (fuera de los componentes para no recrearlas en cada render) ---

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const letterContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.45 } }
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

// --- ILUSTRACIÓN 3D VECTORIAL DEL HERO (Se muestra automáticamente si no existe /hero-devices.png) ---

const HeroDevicesIllustration = () => (
  <svg viewBox="0 0 700 500" fill="none" className="w-full max-w-[680px] h-auto drop-shadow-[0_0_35px_rgba(139,92,246,0.25)]">
    <defs>
      <linearGradient id="purpleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1D0B30" />
        <stop offset="50%" stopColor="#11051F" />
        <stop offset="100%" stopColor="#1E1B4B" />
      </linearGradient>
      <linearGradient id="towerSide" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#24102F" />
        <stop offset="100%" stopColor="#0D0417" />
      </linearGradient>
    </defs>

    {/* Líneas de circuito en la base isométrica */}
    <g opacity="0.65" stroke="url(#purpleBlue)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M80 390 L220 455 L490 345 L640 410" strokeDasharray="6 6" />
      <path d="M130 430 L320 490 L610 365" />
      <path d="M40 350 L180 410 L350 330" />
      <circle cx="220" cy="455" r="4" fill="#8B5CF6" />
      <circle cx="320" cy="490" r="3.5" fill="#2563EB" />
      <circle cx="610" cy="365" r="4" fill="#8B5CF6" />
      <circle cx="180" cy="410" r="3" fill="#2563EB" />
    </g>

    {/* Plataforma brillante inferior */}
    <ellipse cx="360" cy="370" rx="250" ry="85" fill="url(#purpleBlue)" opacity="0.12" />

    {/* 1. SERVIDOR / PC TOWER (Derecha) */}
    <g transform="translate(455, 135)">
      <polygon points="85,0 175,38 90,76 0,38" fill="#2D1441" stroke="#8B5CF6" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="45" y1="25" x2="125" y2="59" stroke="url(#purpleBlue)" strokeWidth="3" strokeLinecap="round" />
      <polygon points="0,38 90,76 90,225 0,185" fill="url(#towerSide)" stroke="#4B1D72" strokeWidth="1.2" />
      <polygon points="90,76 175,38 175,185 90,225" fill="#130720" stroke="#2563EB" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="25" y1="75" x2="65" y2="92" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25" y1="90" x2="45" y2="98" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      <circle cx="72" cy="195" r="3.5" fill="#8B5CF6" />
    </g>

    {/* 2. LAPTOP ABIERTA (Centro) */}
    <g transform="translate(185, 135)">
      <polygon points="30,15 225,-35 225,115 30,165" fill="url(#screenGlow)" stroke="url(#purpleBlue)" strokeWidth="2" />
      <path d="M45,120 Q120,60 210,75" stroke="#8B5CF6" strokeWidth="1.8" fill="none" opacity="0.7" />
      <path d="M45,135 Q130,85 210,95" stroke="#2563EB" strokeWidth="1.4" fill="none" opacity="0.6" />
      <polygon points="30,165 225,115 310,165 115,220" fill="#1C0C2B" stroke="#8B5CF6" strokeWidth="1.5" />
      <polygon points="55,168 215,126 265,154 105,198" fill="#0F051A" stroke="#4B1D72" strokeWidth="1" />
      <polygon points="150,188 195,175 215,187 170,200" fill="#24102F" stroke="#8B5CF6" strokeWidth="0.8" />
    </g>

    {/* 3. SMARTPHONE (Izquierda) */}
    <g transform="translate(75, 165)">
      <rect x="0" y="0" width="82" height="165" rx="14" transform="skewY(-14)" fill="url(#screenGlow)" stroke="url(#purpleBlue)" strokeWidth="2.2" />
      <line x1="30" y1="14" x2="52" y2="8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="41" cy="75" r="16" fill="#8B5CF6" opacity="0.2" />
      <circle cx="41" cy="75" r="4" fill="#8B5CF6" />
      <path d="M15,85 Q41,65 68,70" stroke="url(#purpleBlue)" strokeWidth="1.5" fill="none" />
      <line x1="28" y1="145" x2="54" y2="138" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </g>
  </svg>
);

// --- LOS 10 ISOTIPOS ABSTRACTOS DEL MANUAL DE MARCA (SVG Puro) ---

const AbstractIsotype = ({ type }) => {
  const gradId = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  const renderShape = () => {
    switch (type) {
      case 'construccion':
        return (
          <g fill={`url(#${gradId})`}>
            <polygon points="55,12 22,32 22,50 40,40 55,48 55,12" opacity="0.9" />
            <polygon points="22,60 58,38 76,48 40,70 40,86 76,64 76,80 40,94 22,82" />
          </g>
        );
      case 'direccion':
        return (
          <g fill={`url(#${gradId})`}>
            <polygon points="28,22 42,22 66,50 42,78 28,78 52,50" opacity="0.45" />
            <polygon points="46,14 62,14 88,50 62,86 46,86 72,50" />
          </g>
        );
      case 'profundidad':
        return (
          <g fill={`url(#${gradId})`}>
            <polygon points="50,52 85,70 50,88 15,70" opacity="0.25" />
            <polygon points="50,34 85,52 50,70 15,52" opacity="0.55" />
            <polygon points="50,16 85,34 50,52 15,34" />
          </g>
        );
      case 'conexion':
        return (
          <g fill="none" stroke={`url(#${gradId})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
            <path d="M43,18 L20,32 L20,68 L43,82" />
            <path d="M57,18 L80,32 L80,68 L57,82" />
          </g>
        );
      case 'eficiencia':
        return (
          <g fill={`url(#${gradId})`}>
            <polygon points="20,18 68,18 78,28 68,38 20,38 28,28" />
            <polygon points="26,42 74,42 84,52 74,62 26,62 34,52" opacity="0.85" />
            <polygon points="20,66 68,66 78,76 68,86 20,86 28,76" opacity="0.7" />
          </g>
        );
      case 'integracion':
        return (
          <g fill={`url(#${gradId})`}>
            <path d="M44,16 L14,50 L44,84 L52,75 L29,50 L52,25 Z" />
            <path d="M56,16 L86,50 L56,84 L48,75 L71,50 L48,25 Z" opacity="0.8" />
            <polygon points="50,41 59,50 50,59 41,50" />
          </g>
        );
      case 'comunicacion':
        return (
          <g fill={`url(#${gradId})`}>
            <path d="M38,20 L12,50 L38,80 L46,72 L26,50 L46,28 Z" />
            <path d="M62,20 L88,50 L62,80 L54,72 L74,50 L54,28 Z" />
            <circle cx="39" cy="46" r="4.5" />
            <circle cx="50" cy="50" r="5" />
            <circle cx="61" cy="54" r="4.5" />
          </g>
        );
      case 'estructura':
        return (
          <g fill={`url(#${gradId})`}>
            <path d="M50,12 L82,30 L82,70 L54,86 L54,72 L70,63 L70,37 L50,25 L30,37 L30,63 L46,72 L46,86 L18,70 L18,30 Z" />
            <polygon points="50,38 62,45 62,59 50,66 38,59 38,45" opacity="0.85" />
          </g>
        );
      case 'innovacion':
        return (
          <g stroke={`url(#${gradId})`} strokeWidth="6" strokeLinecap="round">
            <line x1="18" y1="82" x2="80" y2="20" />
            <line x1="22" y1="54" x2="58" y2="18" />
            <line x1="44" y1="82" x2="82" y2="44" />
            <line x1="64" y1="82" x2="82" y2="64" />
            <circle cx="18" cy="82" r="5" fill="#2563EB" stroke="none" />
            <circle cx="80" cy="20" r="5" fill="#8B5CF6" stroke="none" />
            <circle cx="58" cy="18" r="5" fill="#8B5CF6" stroke="none" />
            <circle cx="22" cy="54" r="5" fill="#2563EB" stroke="none" />
            <circle cx="82" cy="44" r="5" fill="#8B5CF6" stroke="none" />
            <circle cx="44" cy="82" r="5" fill="#2563EB" stroke="none" />
          </g>
        );
      case 'evolucion':
      default:
        return (
          <g fill={`url(#${gradId})`}>
            <polygon points="24,14 84,50 24,86 24,14" opacity="0.2" />
            <path d="M24,14 L84,50 L72,58 L38,37 L38,80 L24,86 Z" />
            <path d="M38,65 L66,50 L84,50 L24,86 Z" opacity="0.75" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.25)]">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {renderShape()}
    </svg>
  );
};

// --- SUBCOMPONENTES DE LA PANTALLA DE CARGA (SPLASH) ---

const ServiceIcon = ({ icon, label, delay, colorClass }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="flex flex-col items-center justify-start gap-4 px-6 sm:px-8 border-r border-white/10 last:border-r-0 will-change-transform"
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
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
      className="fixed inset-0 bg-brand-bg flex flex-col items-center justify-center z-50 overflow-hidden will-change-[opacity]"
    >
      {/* Resplandor central con radial-gradient (0% lag de GPU en vez de blur-120px) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(75, 29, 114, 0.35) 0%, rgba(36, 16, 47, 0.15) 45%, transparent 70%)'
        }}
      />

      {/* Rayos de luz en las esquinas inferiores */}
      <LightRays colorClass="text-brand-primary" className="opacity-80" />
      <LightRays mirrored colorClass="text-brand-blue" className="opacity-80" />

      <div className="flex flex-col items-center mb-16 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 will-change-transform"
        >
          <motion.img 
            src="/logo.png" 
            alt="Dirgndive Logo" 
            decoding="sync"
            fetchPriority="high"
            className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_25px_rgba(139,92,246,0.3)] will-change-transform"
            animate={{ y: [0, -6, 0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1.1, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div 
          className="flex text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[0.2em] mb-6 text-white ml-[0.2em] will-change-transform"
          variants={letterContainer} 
          initial="hidden" 
          animate="visible"
        >
          {"DIRGNDIV".split("").map((char, index) => (
            <motion.span key={index} variants={letterAnim} className="will-change-transform">
              {char}
            </motion.span>
          ))}
          <motion.span 
            variants={letterAnim} 
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-primary will-change-transform"
          >
            E
          </motion.span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 1.4 }}
          className="text-[0.7rem] md:text-base font-medium tracking-[0.25em] text-brand-light uppercase text-center px-4"
        >
          Tecnología que <span className="text-brand-primary font-bold">evoluciona</span> contigo.
        </motion.p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap justify-center items-stretch mt-4 z-10 w-full max-w-4xl px-4">
        <ServiceIcon
          delay={1.7}
          label="Apps Móviles"
          colorClass="text-brand-primary"
          icon={<Smartphone className="w-full h-full" strokeWidth={1.75} />}
        />
        <ServiceIcon
          delay={1.9}
          label="Páginas Web"
          colorClass="text-brand-blue"
          icon={<Globe className="w-full h-full" strokeWidth={1.75} />}
        />
        <ServiceIcon
          delay={2.1}
          label="Soporte Técnico"
          colorClass="text-brand-primary"
          icon={<Headset className="w-full h-full" strokeWidth={1.75} />}
        />
        <ServiceIcon
          delay={2.3}
          label={<>Venta y<br/>Mantenimiento<br/>de Equipos</>}
          colorClass="text-brand-blue"
          icon={<Monitor className="w-full h-full" strokeWidth={1.75} />}
        />
      </div>
    </motion.div>
  );
};

// --- DATOS DE MÓDULOS CORPORATIVOS ---

const SERVICES_DATA = [
  {
    title: 'Desarrollo de Apps Móviles',
    category: 'Software & Movilidad',
    description:
      'Diseñamos y desarrollamos aplicaciones móviles intuitivas, rápidas y escalables para Android e iOS, adaptadas al flujo real de cada persona o empresa.',
    features: ['Interfaces UI/UX modernas', 'Integración con la nube y APIs', 'Rendimiento fluido y multiplataforma'],
    icon: Smartphone,
    accent: 'primary'
  },
  {
    title: 'Páginas y Sistemas Web',
    category: 'Presencia & Plataformas',
    description:
      'Construimos desde sitios web corporativos de alto impacto hasta aplicaciones web progresivas (PWA) y paneles administrativos a medida.',
    features: ['Diseño 100% responsivo y veloz', 'Optimización SEO y seguridad', 'Arquitectura moderna y escalable'],
    icon: Globe,
    accent: 'blue'
  },
  {
    title: 'Soporte Técnico Especializado',
    category: 'Asistencia Tecnológica',
    description:
      'Brindamos asistencia remota y presencial para personas y empresas. Resolvemos incidencias de software, sistemas operativos, redes y configuración.',
    features: ['Diagnóstico rápido y certero', 'Configuración de redes y respaldos', 'Atención cercana y confiable'],
    icon: Headset,
    accent: 'primary'
  },
  {
    title: 'Mantenimiento Preventivo y Correctivo',
    category: 'Computadoras, Laptops e Impresoras',
    description:
      'Cuidamos y recuperamos el máximo rendimiento de tus computadoras de escritorio, laptops e impresoras con servicio técnico profesional garantizado.',
    features: ['Limpieza interna y cambio de pasta térmica', 'Reparación de laptops e impresoras', 'Potenciación con SSD y memoria RAM'],
    icon: Wrench,
    accent: 'blue'
  },
  {
    title: 'Venta de Equipos y Accesorios',
    category: 'Tecnología & Electrónica',
    description:
      'Comercializamos computadoras, laptops, componentes, periféricos y accesorios electrónicos seleccionados para brindarte calidad y respaldo.',
    features: ['Asesoría personalizada según tu uso', 'Equipos para empresas, estudio o gaming', 'Garantía y entrega configurada'],
    icon: ShoppingBag,
    accent: 'primary'
  }
];

const BRAND_PERSONALITY = [
  { label: 'Inteligente', desc: 'Soluciones pensadas estratégicamente para optimizar tu día a día.', icon: Brain },
  { label: 'Innovadora', desc: 'Tecnología actual que impulsa la evolución constante.', icon: Rocket },
  { label: 'Confiable', desc: 'Seguridad, honestidad y respaldo en cada desarrollo o equipo.', icon: ShieldCheck },
  { label: 'Técnica', desc: 'Precisión en ingeniería de software, soporte y hardware.', icon: Settings },
  { label: 'Cercana', desc: 'Acompañamiento humano sin perder tu esencia e identidad.', icon: HeartHandshake }
];

const ISOTYPES_LIST = [
  { id: 'construccion', title: 'Construcción Digital' },
  { id: 'direccion', title: 'Dirección y Movimiento' },
  { id: 'profundidad', title: 'Profundidad y Soluciones' },
  { id: 'conexion', title: 'Conexión y Soporte' },
  { id: 'eficiencia', title: 'Eficiencia y Velocidad' },
  { id: 'integracion', title: 'Integración Tecnológica' },
  { id: 'comunicacion', title: 'Comunicación y Desarrollo' },
  { id: 'estructura', title: 'Estructura y Confianza' },
  { id: 'innovacion', title: 'Innovación y Tecnología' },
  { id: 'evolucion', title: 'Evolución Constante' }
];

// --- COMPONENTE PRINCIPAL ---

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [hasCustomHeroImg, setHasCustomHeroImg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    servicio: 'Desarrollo de Apps Móviles',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState('');

  // 1. Precarga REAL en GPU/Memoria: decodifica el logo y las fuentes ANTES de disparar el primer frame
  useEffect(() => {
    let isMounted = true;

    const preloadAssets = async () => {
      try {
        const logoImg = new Image();
        logoImg.src = '/logo.png';
        if (logoImg.decode) {
          await logoImg.decode().catch(() => {});
        }

        // Verifica si existe /hero-devices.png en public
        const heroImg = new Image();
        heroImg.onload = () => {
          if (isMounted) setHasCustomHeroImg(true);
        };
        heroImg.onerror = () => {
          if (isMounted) setHasCustomHeroImg(false);
        };
        heroImg.src = '/hero-devices.png';

        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Si algún asset falla, continuamos sin bloquear la app
      }

      // Doble requestAnimationFrame asegura que el navegador ya pintó el fondo antes de animar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isMounted) setIsReady(true);
        });
      });
    };

    preloadAssets();
    return () => { isMounted = false; };
  }, []);

  // 2. El Splash Screen dura 4.5 segundos contados desde que los assets están listos
  useEffect(() => {
    if (!isReady) return;
    const splashTimer = setTimeout(() => setShowSplash(false), 4500);
    return () => clearTimeout(splashTimer);
  }, [isReady]);

  // 3. Envío de correo mediante Web3Forms
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `⚡ Nuevo requerimiento Dirgndive: ${formData.servicio}`,
          from_name: formData.nombre,
          Nombre_o_Empresa: formData.nombre,
          Contacto_Cliente: formData.contacto || 'No especificado',
          Servicio_Requerido: formData.servicio,
          Mensaje_Detalle: formData.mensaje
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSent(true);
        setFormData({
          nombre: '',
          contacto: '',
          servicio: 'Desarrollo de Apps Móviles',
          mensaje: ''
        });
        setTimeout(() => setFormSent(false), 5000);
      } else {
        setFormError('Revisa que hayas colocado tu Access Key de Web3Forms o contáctanos por WhatsApp.');
      }
    } catch {
      setFormError('No se pudo conectar con el servidor de correo. Intenta enviarlo por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Generador de enlaces de WhatsApp (con los datos del formulario o mensaje general)
  const cleanWhatsAppNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  const getDirectWhatsAppUrl = () => {
    const text = 'Hola Dirgndive, me gustaría recibir información sobre sus servicios tecnológicos.';
    return `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hola *Dirgndive*, les escribo desde su página web:\n\n*Nombre/Empresa:* ${
      formData.nombre || 'Cliente Web'
    }\n*Contacto:* ${formData.contacto || 'Por este medio'}\n*Servicio de interés:* ${
      formData.servicio
    }\n*Detalles:* ${formData.mensaje || 'Me gustaría recibir asesoría y cotización.'}`;

    window.open(`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Mientras decodifica la imagen en memoria (milisegundos), fondo oscuro puro sin tirones
  if (!isReady) return <div className="min-h-screen bg-brand-bg" />;

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-white relative overflow-x-hidden selection:bg-brand-primary selection:text-white">
      {/* AnimatePresence con mode="wait" evita que el Splash y el Hero peleen por la GPU al mismo tiempo */}
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div 
            key="hero"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="min-h-screen bg-brand-bg font-sans relative overflow-x-hidden will-change-[opacity]"
          >
            {/* ================= NAVBAR ================= */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-brand-bg/80 border-b border-white/5">
              <nav className="container mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
                <motion.a
                  href="#inicio"
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-3 cursor-pointer will-change-transform focus:outline-none"
                >
                  <img src="/logo.png" alt="Dirgndive Logo" className="w-8 h-8 object-contain" />
                  <span className="text-lg font-bold tracking-[0.2em] text-white">DIRGNDIVE</span>
                </motion.a>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex items-center gap-10 text-[0.7rem] font-semibold text-brand-light/80 uppercase tracking-widest will-change-transform"
                >
                  <div className="hidden md:flex gap-10">
                    <a href="#inicio" className="hover:text-brand-primary transition-colors">Inicio</a>
                    <a href="#servicios" className="hover:text-brand-primary transition-colors">Servicios</a>
                    <a href="#nosotros" className="hover:text-brand-primary transition-colors">Nosotros</a>
                    <a href="#contacto" className="hover:text-brand-primary transition-colors">Contacto</a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menú de navegación"
                    className="p-2 rounded-lg text-brand-light hover:text-brand-primary hover:bg-white/5 focus:outline-none transition-colors"
                  >
                    <Menu size={24} strokeWidth={2} />
                  </button>
                </motion.div>
              </nav>
            </header>

            {/* ================= DRAWER LATERAL (MENÚ HAMBURGUESA) ================= */}
            <AnimatePresence>
              {menuOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                  />
                  <motion.aside
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#160826] border-l border-brand-primary/20 z-50 p-8 flex flex-col justify-between shadow-2xl"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <img src="/logo.png" alt="Dirgndive" className="w-7 h-7 object-contain" />
                          <span className="font-bold tracking-[0.2em] text-sm">DIRGNDIVE</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMenuOpen(false)}
                          className="p-1.5 rounded-lg text-brand-light hover:text-brand-primary focus:outline-none"
                        >
                          <X size={22} />
                        </button>
                      </div>

                      <div className="mt-8 flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.2em]">
                        <a href="#inicio" onClick={() => setMenuOpen(false)} className="py-2 hover:text-brand-primary transition-colors">
                          Inicio
                        </a>
                        <a href="#servicios" onClick={() => setMenuOpen(false)} className="py-2 hover:text-brand-primary transition-colors">
                          Servicios
                        </a>
                        <a href="#nosotros" onClick={() => setMenuOpen(false)} className="py-2 hover:text-brand-primary transition-colors">
                          Nosotros & Personalidad
                        </a>
                        <a href="#isotipos" onClick={() => setMenuOpen(false)} className="py-2 hover:text-brand-primary transition-colors">
                          Exploración de Isotipos
                        </a>
                        <a href="#contacto" onClick={() => setMenuOpen(false)} className="py-2 hover:text-brand-primary transition-colors">
                          Contacto
                        </a>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-3">
                      <p className="text-xs text-brand-light/70 leading-relaxed mb-2">
                        Tecnología que <span className="text-brand-primary font-semibold">evoluciona</span> contigo, sin perder tu identidad.
                      </p>
                      <a
                        href="#contacto"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full text-center py-3 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all"
                      >
                        Solicitar Atención
                      </a>
                      <a
                        href={getDirectWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        <MessageCircle size={16} /> WhatsApp Directo
                      </a>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* ================= 1. HERO SECTION (#inicio) ================= */}
            <section id="inicio" className="relative overflow-hidden">
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

              <main className="container mx-auto px-8 lg:px-16 pt-10 lg:pt-12 pb-24 flex flex-col lg:flex-row items-center justify-between relative z-10 lg:min-h-[82vh]">
                <motion.div 
                  className="lg:w-[50%] z-10"
                  initial="hidden" 
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
                  }}
                >
                  <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.2] tracking-tight mb-6 text-white will-change-transform">
                    Soluciones <br /> tecnológicas que <br /> impulsan <span className="text-brand-primary">tu mundo.</span>
                  </motion.h1>

                  <motion.p variants={fadeUp} className="text-brand-light/80 text-sm sm:text-base max-w-xl leading-relaxed mb-10">
                    Desarrollo de aplicaciones móviles y páginas web, soporte técnico, mantenimiento de computadoras, laptops e impresoras, y venta de equipos electrónicos.
                  </motion.p>
                  
                  <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 will-change-transform">
                    <a
                      href="#servicios"
                      className="px-10 py-3.5 rounded-full border border-brand-primary text-brand-primary text-sm font-semibold tracking-wide bg-brand-bg/50 hover:bg-brand-primary hover:text-white transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] focus:outline-none"
                    >
                      Conoce más
                    </a>
                    <a
                      href="#contacto"
                      className="px-6 py-3.5 rounded-full text-brand-light/85 hover:text-white text-sm font-medium tracking-wide flex items-center gap-2 transition-colors"
                    >
                      Contáctanos <ArrowRight size={16} className="text-brand-primary" />
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
                  className="lg:w-[50%] mt-16 lg:mt-0 relative flex justify-center lg:justify-end items-center will-change-transform"
                >
                  {/* Resplandor detrás de dispositivos optimizado con radial-gradient */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none -z-10"
                    style={{
                      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 65%)'
                    }}
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 6, delay: 1.1, ease: "easeInOut" }}
                    className="w-full flex justify-center lg:justify-end relative z-10 will-change-transform"
                  >
                    {hasCustomHeroImg ? (
                      <img
                        src="/hero-devices.png"
                        alt="Dispositivos Dirgndive"
                        className="w-full max-w-[560px] lg:max-w-[720px] object-contain"
                      />
                    ) : (
                      <HeroDevicesIllustration />
                    )}
                  </motion.div>
                </motion.div>
              </main>
            </section>

            {/* ================= 2. SECCIÓN SERVICIOS (#servicios) ================= */}
            <section id="servicios" className="py-24 relative border-t border-white/5 bg-[#0D0418]">
              <div className="container mx-auto px-8 lg:px-16 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-3xl mx-auto mb-16"
                >
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.25em]">
                    Soluciones Integrales
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5">
                    Nuestros <span className="text-brand-primary">Servicios</span>
                  </h2>
                  <p className="text-brand-light/75 text-sm sm:text-base leading-relaxed">
                    Integramos innovación, desarrollo de software y asistencia tecnológica bajo una misma marca para personas y empresas.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES_DATA.map((service, idx) => {
                    const IconComponent = service.icon;
                    const isPrimary = service.accent === 'primary';

                    return (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="group rounded-2xl bg-brand-dark/35 border border-white/10 hover:border-brand-primary/60 p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                                isPrimary
                                  ? 'bg-brand-primary/15 border-brand-primary/40 text-brand-primary'
                                  : 'bg-brand-blue/15 border-brand-blue/40 text-brand-blue'
                              }`}
                            >
                              <IconComponent size={28} strokeWidth={1.75} />
                            </div>
                            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-light/50 text-right">
                              {service.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors">
                            {service.title}
                          </h3>

                          <p className="text-brand-light/75 text-sm leading-relaxed mb-6">
                            {service.description}
                          </p>
                        </div>

                        <ul className="space-y-2.5 pt-4 border-t border-white/10">
                          {service.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-xs text-brand-light/85">
                              <CheckCircle2
                                size={15}
                                className={isPrimary ? 'text-brand-primary shrink-0' : 'text-brand-blue shrink-0'}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ================= 3. SECCIÓN NOSOTROS & PERSONALIDAD DE MARCA (#nosotros) ================= */}
            <section id="nosotros" className="py-24 relative border-t border-white/5 overflow-hidden">
              <div className="container mx-auto px-8 lg:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-7"
                  >
                    <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.25em]">
                      Identidad Dirgndive
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6 leading-tight">
                      Tecnología que <span className="text-brand-primary">evoluciona</span> contigo, sin perder tu identidad.
                    </h2>
                    <p className="text-brand-light/85 text-base leading-relaxed mb-5">
                      <strong className="text-white">Dirgndive</strong> ofrece soluciones digitales y tecnológicas para personas y empresas. Nuestros servicios incluyen el desarrollo de aplicaciones móviles y páginas web, soporte técnico, mantenimiento preventivo y correctivo de computadoras, laptops e impresoras, así como la venta de equipos y accesorios electrónicos.
                    </p>
                    <p className="text-brand-light/75 text-base leading-relaxed">
                      La empresa busca brindar soluciones eficientes, confiables y adaptadas a las necesidades de cada cliente, integrando innovación, desarrollo de software y asistencia tecnológica bajo una misma marca.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-5"
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-brand-dark/80 to-[#120621] border border-brand-primary/30 p-8 sm:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                      <div className="flex items-center gap-4 mb-6">
                        <img src="/logo.png" alt="Isotipo Dirgndive" className="w-14 h-14 object-contain" />
                        <div>
                          <h3 className="text-xl font-bold tracking-[0.2em]">DIRGNDIVE</h3>
                          <p className="text-xs text-brand-primary uppercase tracking-widest font-semibold">
                            Software • Soporte • Hardware
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-sm sm:text-base italic text-brand-light/90 border-l-2 border-brand-primary pl-4 py-1 mb-6">
                        “Tecnología que evoluciona contigo, sin perder tu identidad.”
                      </blockquote>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-center">
                        <div className="p-3 rounded-xl bg-white/5">
                          <span className="block text-2xl font-bold text-brand-primary">360°</span>
                          <span className="text-[0.68rem] uppercase tracking-wider text-brand-light/70">
                            Cobertura Digital
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5">
                          <span className="block text-2xl font-bold text-brand-blue">100%</span>
                          <span className="text-[0.68rem] uppercase tracking-wider text-brand-light/70">
                            A tu Medida
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Personalidad de Marca (5 Pilares del Brandbook) */}
                <div className="pt-6">
                  <h3 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-brand-light/60 mb-10">
                    Personalidad de Marca
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {BRAND_PERSONALITY.map((item, idx) => {
                      const TraitIcon = item.icon;
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.08 }}
                          className="rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-primary/50 p-6 flex flex-col items-center text-center transition-all"
                        >
                          <div className="w-12 h-12 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center mb-4">
                            <TraitIcon size={24} strokeWidth={1.75} />
                          </div>
                          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-2">{item.label}</h4>
                          <p className="text-xs text-brand-light/65 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* ================= 4. EXPLORACIÓN DE ISOTIPOS (#isotipos) ================= */}
            <section id="isotipos" className="py-24 bg-[#0B0314] border-t border-white/5 relative">
              <div className="container mx-auto px-8 lg:px-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-2xl mx-auto mb-16"
                >
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.25em]">
                    ADN & Conceptos Visuales
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold mt-3 mb-4">
                    Pilares que Impulsan <span className="text-brand-primary">Dirgndive</span>
                  </h2>
                  <p className="text-brand-light/70 text-sm">
                    Nuestra simbología refleja la unión entre ingeniería digital, movimiento constante y soporte confiable.
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-4">
                  {ISOTYPES_LIST.map((iso, idx) => (
                    <motion.div
                      key={iso.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      className="flex flex-col items-center justify-center px-4 border-r border-white/10 last:border-r-0 lg:[&:nth-child(5n)]:border-r-0 group"
                    >
                      <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                        <AbstractIsotype type={iso.id} />
                      </div>
                      <span className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brand-light/90 text-center max-w-[150px] leading-snug">
                        {iso.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ================= 5. SECCIÓN CONTACTO (#contacto) ================= */}
            <section id="contacto" className="py-24 relative border-t border-white/5">
              <div className="container mx-auto px-8 lg:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-5"
                  >
                    <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.25em]">
                      Atención Directa
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-5">
                      ¿Listo para evolucionar con <span className="text-brand-primary">Dirgndive</span>?
                    </h2>
                    <p className="text-brand-light/75 text-sm sm:text-base leading-relaxed mb-8">
                      Cuéntanos tu idea de software, agenda el mantenimiento de tus computadoras o impresoras, o cotiza los equipos que necesitas.
                    </p>

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-brand-primary/15 border border-brand-primary/30 text-brand-primary flex items-center justify-center shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light/60">Cobertura</h4>
                          <p className="text-sm font-medium text-white">Quito, Ecuador — Atención presencial y remota</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-brand-blue/15 border border-brand-blue/30 text-brand-blue flex items-center justify-center shrink-0">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light/60">Desarrollo Digital</h4>
                          <p className="text-sm font-medium text-white">Apps Móviles, Páginas Web & Sistemas</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-brand-primary/15 border border-brand-primary/30 text-brand-primary flex items-center justify-center shrink-0">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light/60">Soporte & Equipos</h4>
                          <p className="text-sm font-medium text-white">Mantenimiento de PC, Laptops, Impresoras y Ventas</p>
                        </div>
                      </div>

                      {/* Tarjeta de Enlace Directo a WhatsApp */}
                      <a
                        href={getDirectWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3.5 -mx-3.5 rounded-2xl hover:bg-white/[0.04] border border-transparent hover:border-emerald-500/30 transition-all group"
                      >
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <MessageCircle size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">WhatsApp Oficial</h4>
                          <p className="text-sm font-medium text-white flex items-center gap-1.5">
                            Iniciar chat inmediato <ArrowRight size={14} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                          </p>
                        </div>
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="lg:col-span-7"
                  >
                    <form
                      onSubmit={handleFormSubmit}
                      className="rounded-2xl bg-brand-dark/40 border border-white/10 p-8 sm:p-10 space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-light/80 mb-2">
                            Nombre o Empresa
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Ej. Tu nombre o empresa"
                            className="w-full px-4 py-3 rounded-xl bg-brand-bg/90 border border-white/15 text-sm text-white placeholder:text-brand-light/40 focus:outline-none focus:border-brand-primary transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-light/80 mb-2">
                            Tu Correo o Celular
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.contacto}
                            onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                            placeholder="Ej. correo@empresa.com o 099..."
                            className="w-full px-4 py-3 rounded-xl bg-brand-bg/90 border border-white/15 text-sm text-white placeholder:text-brand-light/40 focus:outline-none focus:border-brand-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-light/80 mb-2">
                          Servicio Requerido
                        </label>
                        <select
                          value={formData.servicio}
                          onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-brand-bg/90 border border-white/15 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
                        >
                          <option value="Desarrollo de Apps Móviles">Desarrollo de Apps Móviles</option>
                          <option value="Páginas y Sistemas Web">Páginas y Sistemas Web</option>
                          <option value="Soporte Técnico">Soporte Técnico</option>
                          <option value="Mantenimiento de Computadoras / Laptops / Impresoras">
                            Mantenimiento de PC / Laptops / Impresoras
                          </option>
                          <option value="Compra de Equipos y Accesorios">Compra de Equipos y Accesorios</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-light/80 mb-2">
                          Detalles de tu requerimiento
                        </label>
                        <textarea
                          rows="4"
                          required
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          placeholder="Cuéntanos cómo podemos ayudarte..."
                          className="w-full px-4 py-3 rounded-xl bg-brand-bg/90 border border-white/15 text-sm text-white placeholder:text-brand-light/40 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        {/* Botón Enviar al Correo (Web3Forms) */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-8 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] focus:outline-none ${
                            isSubmitting
                              ? 'bg-brand-primary/50 cursor-not-allowed'
                              : 'bg-brand-primary hover:bg-brand-primary/90'
                          }`}
                        >
                          {isSubmitting ? 'Enviando...' : 'Enviar al Correo'}
                          {!isSubmitting && <Send size={16} />}
                        </button>

                        {/* Botón Enviar por WhatsApp con los datos del formulario */}
                        <button
                          type="button"
                          onClick={handleSendViaWhatsApp}
                          className="px-7 py-3.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all focus:outline-none"
                        >
                          Enviar por WhatsApp <MessageCircle size={17} />
                        </button>
                      </div>

                      {formSent && (
                        <p className="text-xs font-semibold text-emerald-400 pt-1">
                          ¡Solicitud enviada con éxito al correo de Dirgndive! Te responderemos pronto.
                        </p>
                      )}

                      {formError && (
                        <p className="text-xs font-semibold text-amber-400 pt-1">
                          {formError}
                        </p>
                      )}
                    </form>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ================= BOTÓN FLOTANTE DE WHATSAPP ================= */}
            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chatear por WhatsApp con Dirgndive"
              className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:scale-105 transition-all duration-300 focus:outline-none"
            >
              <MessageCircle size={20} strokeWidth={2.2} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* ================= FOOTER ================= */}
            <footer className="py-10 border-t border-white/10 bg-[#090211] text-center sm:text-left">
              <div className="container mx-auto px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Dirgndive Logo" className="w-6 h-6 object-contain" />
                  <span className="text-sm font-bold tracking-[0.2em]">DIRGNDIVE</span>
                </div>
                <p className="text-xs text-brand-light/60">
                  © {new Date().getFullYear()} Dirgndive. Tecnología que evoluciona contigo, sin perder tu identidad.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;