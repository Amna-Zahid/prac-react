export const loadState = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) || "null");
    } catch (e) {
        return null;
    }
}
export const saveState = (key: string, value: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
}
