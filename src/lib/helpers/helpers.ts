const useQuery = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return Object.fromEntries(urlSearchParams.entries())
}

export {
  useQuery
}
