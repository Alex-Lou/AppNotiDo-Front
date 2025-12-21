// src/utils/classNames.js

/**
 * Combine plusieurs classes CSS en filtrant les valeurs falsy
 * @param {...(string|boolean|null|undefined)} classes - Classes à combiner
 * @returns {string} String de classes combinées
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
