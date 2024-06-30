export async function HttpGet<T>(url: string) {
  const response = await fetch(url)

  const json = await response.json()

  return json as T
}
