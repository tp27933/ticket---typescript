export function getRandomInt (max: number) {
  return Math.floor(Math.random() * max)
}
export function dateFormmater (fs: string | Date | number) {
  const da = new Date(fs)

  var year = da.getFullYear()
  var month = da.getMonth() + 1
  var date = da.getDate()
  return [year, month, date].join('-')
}
