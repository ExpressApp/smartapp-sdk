const COPY_RESTRICION_STYLE_ID = 'native-copy-restriction'

export const useQuery = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return Object.fromEntries(urlSearchParams.entries())
}

const noop = (event: Event): boolean => {
  event.preventDefault()
  event.stopImmediatePropagation()
  return false
}

const preventSelection = (event: Event): void => {
  const isInput =
    event.target instanceof Element && event.target.closest('input, textarea, [contenteditable="true"]') !== null

  if (!isInput) noop(event)
}

const addCopyRestrictionStyles = (): void => {
  if (document.getElementById(COPY_RESTRICION_STYLE_ID)) return

  const style = document.createElement('style')
  style.id = COPY_RESTRICION_STYLE_ID
  style.textContent = `
    html,
    body,
    body * {
      -webkit-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }

    body input,
    body textarea,
    body [contenteditable="true"],
    body [contenteditable="true"] * {
      -webkit-user-select: text !important;
      user-select: text !important;
      -webkit-touch-callout: default !important;
    }
  `

  const styleRoot = document.head || document.documentElement
  styleRoot.appendChild(style)
}

export const disableCopy = () => {
  document.addEventListener('contextmenu', noop, true)
  document.addEventListener('copy', noop, true)
  document.addEventListener('cut', noop, true)
  document.addEventListener('selectstart', preventSelection, true)

  addCopyRestrictionStyles()
}
