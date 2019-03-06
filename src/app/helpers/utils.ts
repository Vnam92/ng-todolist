/**
 * Generating unique id
 * @returns {string}
 */
export const uniqueId = (): string => {
  return (
    '_ng' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
};

/**
 * Saving token into localStorage
 * @param key
 * @param value
 */
export function setLocalItem(key, value) {
  localStorage.setItem(key, value)
}

/**
 * Getting element from localStorage by key
 * @param key
 * @returns {string}
 */
export function getLocalItem(key) {
  return localStorage.getItem(key)
}

/**
 * Deleting element in localStorage by key
 * @param key
 */
export function deleteLocalItem(key) {
  localStorage.removeItem(key)
}
