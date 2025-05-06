export const useQuery = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return Object.fromEntries(urlSearchParams.entries())
}

const noop = (event: Event): boolean => {
  event.preventDefault()
  return false
}

export const disableCopy = () => {
  document.addEventListener('selectstart', noop);
  document.addEventListener('contextmenu', noop);
  document.addEventListener('copy', noop)
}
