export async function get(url: string) {
  try {
    const response = await fetch(url)

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    const json = await response.json()

    console.log(json)

    return json
  } catch (error) {
    console.log({error})
  }
}