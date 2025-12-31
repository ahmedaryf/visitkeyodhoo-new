export const FAV_KEY = "favourites";

export function getFavourites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const item = localStorage.getItem(FAV_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}

export function toggleFavourites(id: string) {
  if (typeof window === "undefined") return;
  const favs = getFavourites();
  const update = favs.includes(id)
    ? favs.filter((f) => f !== id)
    : [...favs, id];

  localStorage.setItem(FAV_KEY, JSON.stringify(update));

  // notify same tab
  window.dispatchEvent(new Event("favourites-updated"));
}

export function isFavourite(id: string): boolean {
  return getFavourites().includes(id);
}
