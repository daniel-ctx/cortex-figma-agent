/**
 * Tokens Cortex para Tailwind — injetado inline nos protótipos gerados.
 *
 * VALORES HEX: extraídos do Claude System (arquivo 9zSZlgwQ9GvVB5et8VyRUj).
 * Confirmados via get_design_context no ícone zoom-question (Violeta 500)
 * e via prototype growth-login-16-04-2026 (neutros e Dark Gray).
 * Entradas marcadas "aproximação" ainda não foram confirmadas diretamente.
 *
 * Uso no HTML gerado:
 *   <script>tailwind.config = require('./cortex-tailwind-config.js')</script>
 * Ou copie o objeto module.exports diretamente no <script> inline.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Color/Primary/* — Claude System variável "Violeta 500"
        // Confirmado via get_design_context (icon) + prototype growth-login
        primary: {
          200: '#e8d0f1', // derivado do Violeta 500 (H=284, L=88%)
          300: '#cf95e5', // derivado do Violeta 500 (H=284, L=74%)
          500: '#8418ab', // Violeta 500 — CONFIRMADO Claude System Collection 1
          600: '#6e148f', // Violeta 600 — CONFIRMADO (hover state no prototype)
        },
        // "Dark Gray" — Claude System Collection 1 — CONFIRMADO via prototype
        'dark-gray': '#2d292e',
        // Color/Neutral/* — escala de neutros — ajustados via prototype Claude System
        neutral: {
          50:  '#F8F8FA', // aproximação
          100: '#F1F1F5', // aproximação
          200: '#d5d3d9', // borda de input — confirmado via prototype
          300: '#aaa5b0', // texto secundário — confirmado via prototype
          400: '#808087', // labels/ícones — confirmado via prototype
          500: '#7a7581', // placeholder/helper text — confirmado via prototype
          600: '#3D3D55', // aproximação
          950: '#0F0F1A', // aproximação
        },
        // Semânticas
        success: '#22C55E',
        error:   '#e53e3e', // confirmado via prototype Claude System
        warning: '#F59E0B',
        info:    '#3B82F6',
      },
      fontFamily: {
        heading: ['"REM"', 'sans-serif'],
        body:    ['"Open Sans"', 'sans-serif'],
      },
      borderRadius: {
        sm:  '4px',
        md:  '8px',
        lg:  '12px',
        xl:  '16px',
      },
      spacing: {
        // Escala base 4px — alinhada ao design system
        1:  '4px',
        2:  '8px',
        3:  '12px',
        4:  '16px',
        6:  '24px',
        8:  '32px',
        12: '48px',
        16: '64px',
      },
    },
  },
};
