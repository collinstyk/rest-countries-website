import { API_URL } from "../util/constants";

export async function getCountries() {
  try {
    const res = await fetch(`${API_URL}/all`);

    if (!res.ok) throw new Error("Failed to fetch countries!");

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getCountryDetails(id: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/alpha/${id}`);

    if (!res.ok) throw new Error("Failed to fetch Country Details!");

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getNeighbouringCountry(border: string) {
  try {
    if (border === undefined) return "No border";
    // const res = await fetch(`${API_URL}/name/${border}`);
    const res = await fetch(`${API_URL}/alpha/${border}`);

    if (!res.ok) throw new Error("This Border Country has no Details!");

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
