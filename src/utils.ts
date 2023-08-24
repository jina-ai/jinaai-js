
export function isUrl(str: string): boolean {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return urlPattern.test(str);
}

export function isBase64(str: string): boolean {
    const base64Pattern = /^data:[A-Za-z0-9+/]+;base64,/;
    return base64Pattern.test(str);
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
    const shallowCopy = { ...obj };
    keys.forEach(key => delete shallowCopy[key]);
    return shallowCopy as Omit<T, K>;
}

export default {
    isUrl, isBase64
};