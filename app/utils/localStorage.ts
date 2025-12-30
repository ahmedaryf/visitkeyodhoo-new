export function setItem(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItem<T>(key: string): T | undefined {
  if (typeof window === "undefined") return;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : undefined;
  } catch (error) {
    console.log(error);
  }
}

export function removeItem(key: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}

export function clearStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}
