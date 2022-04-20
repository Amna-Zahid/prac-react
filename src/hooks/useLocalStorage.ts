import {useState} from "react";
export type ExcludeFunction<T> = T extends Function ? never : T

export type UseLocalStorageReturnType<T> = [
    T, (value: T) => void
]


export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {

    const [localValue, setLocalValue] = useState<T>(() => {
        try {
            const storageValue = localStorage.getItem(key);
            return storageValue ? JSON.parse(storageValue) : initialValue;
        } catch (e) {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const newStoreValue = value;
            // const newStoreValue = value instanceof Function ? value(localValue) : value;
            setLocalValue(newStoreValue);
            window.localStorage.setItem(key, JSON.stringify(newStoreValue));
        } catch (e) {
        }
    }


    return [localValue, setValue];
}
