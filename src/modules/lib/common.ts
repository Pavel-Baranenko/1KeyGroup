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

export const formatDate = (date: Date) => {
  const months: { [key: string]: string } = {
    '01': "January",
    '02': "February",
    '03': "March",
    '04': "April",
    '05': "May",
    '06': "June",
    '07': "July",
    '08': "August",
    '09': "September",
    '10': "October",
    '11': "November",
    '12': "December"
  }
  const dateText = String(date).split('T')[0].split('-')
  const temp = String(date).split('T')[1].split(':')
  const day = dateText[2].startsWith('0') ? dateText[2].slice(1) : dateText[2]
  const hour = temp[1].startsWith('0') ? temp[1].slice(1) : temp[1]

  return `posted on ${months[dateText[1]]} ${day}, ${dateText[0]} at ${hour}:${temp[2].slice(0, -5)} p.m.`
}