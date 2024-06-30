export function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  // Format minutes and seconds with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(Math.floor(remainingSeconds)).padStart(2, '0')

  // Calculate and format milliseconds (truncate to two digits)
  const milliseconds = Math.floor((remainingSeconds % 1) * 1000)
  const formattedMilliseconds = String(milliseconds).padStart(3, '0').slice(0, 3) // Limit to two digits

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
}
