/**
 * Sistema de movimiento centralizado. Ningún componente debe declarar
 * duraciones ni easings arbitrarios — todo pasa por aquí para que el
 * movimiento del sitio se sienta como un solo sistema, no como efectos
 * sueltos por componente.
 */

export const EASE_PRIMARY = [0.22, 1, 0.36, 1] as const;
export const EASE_SECONDARY = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  micro: 0.18, // hover, tap, microinteracciones
  small: 0.32, // aparición de un elemento pequeño (botón, chip)
  reveal: 0.65, // reveal editorial (título, párrafo, tarjeta)
  section: 0.9, // transición de sección completa
} as const;

export const STAGGER = {
  min: 0.06,
  max: 0.09,
} as const;

export const TRANSLATE_MAX = 32; // px — desplazamiento máximo de un reveal
export const BLUR_MAX = 6; // px — blur inicial máximo
export const PARALLAX_MAX = 0.06; // 6% — parallax máximo permitido

export const revealTransition = {
  duration: DURATION.reveal,
  ease: EASE_PRIMARY,
};

export const microTransition = {
  duration: DURATION.micro,
  ease: EASE_SECONDARY,
};

/**
 * Tokens para las escenas "cinematográficas" (Riviera App, CTA final).
 * Mismo propósito que DURATION/EASE_* arriba — un solo lugar, nunca tiempos
 * sueltos por archivo — con nombres más explícitos para ese contexto.
 */
export const motionTokens = {
  easePremium: EASE_PRIMARY,
  micro: DURATION.micro,
  reveal: DURATION.reveal,
  scene: 1.4,
  stagger: STAGGER.max,
} as const;
