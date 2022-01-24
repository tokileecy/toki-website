import isNode from 'detect-node'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export enum breakpoints {
  xxs = 0,
  xs = 375,
  sm = 600,
  md = 960,
  lg = 1280,
  xl = 1440,
}

export const mediaQuerys = !isNode
  ? {
      xxs: window.matchMedia(`(min-width: ${breakpoints.xxs}px)`),
      xs: window.matchMedia(`(min-width: ${breakpoints.xs}px)`),
      sm: window.matchMedia(`(min-width: ${breakpoints.sm}px)`),
      md: window.matchMedia(`(min-width: ${breakpoints.md}px)`),
      lg: window.matchMedia(`(min-width: ${breakpoints.lg}px)`),
      xl: window.matchMedia(`(min-width: ${breakpoints.xl}px)`),
    }
  : null
export const mq = {
  /**  \@media (min-width: (breakpoints.xxs)px) */
  xxs: `@media (min-width: ${breakpoints.xxs}px)`,
  /**  \@media (min-width: (breakpoints.xs)px) */
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  /**  \@media (min-width: (breakpoints.sm)px) */
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  /**  \@media (min-width: (breakpoints.md)px) */
  md: `@media (min-width: ${breakpoints.md}px)`,
  /**  \@media (min-width: (breakpoints.lg)px) */
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  /**  \@media (min-width: (breakpoints.xl)px) */
  xl: `@media (min-width: ${breakpoints.xl}px)`,
}

export default breakpoints
