// Central export for all utilities
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
