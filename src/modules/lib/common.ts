export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}
export const addOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
}


export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }
  return { windowWidth }
}


export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}