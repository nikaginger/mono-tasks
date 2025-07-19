export const storage = {
    get: (key: string): any => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('LocalStorage read error:', e);
            return null;
        }
    },

    set: (key: string, value: any): void => {
        localStorage.setItem(key, JSON.stringify(value));
    }
};