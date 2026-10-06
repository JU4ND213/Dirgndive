export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#11051F',      // Fondo ultra oscuro ajustado a la maqueta
          dark: '#24102F',    // Morado oscuro de tu paleta
          primary: '#8B5CF6', // Morado brillante (el que queremos resaltar)
          blue: '#2563EB',    // Azul
          light: '#E5E7EB',   // Texto claro
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}