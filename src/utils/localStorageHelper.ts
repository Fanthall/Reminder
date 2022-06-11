import AsyncStorage from "@react-native-async-storage/async-storage";

/*
    TODO: Eğer logger sistemine geçersek console.error yerine logger kullanımına geçilecek.
*/
export const store = async (key: string, data: any) => {
    try {
        if (typeof data !== "string") {
            data = JSON.stringify({
                ftData: data,
            });
        }
        await AsyncStorage.setItem(key, data);
    } catch (e) {
        console.error('localStorageHelper.store() error', e);
    }
};

export const retrieve = async <T>(key: string): Promise<T | null> => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data) {
            const parsedData = JSON.parse(data);
            if (typeof parsedData.ftData !== "undefined") {
                return parsedData.ftData as T;
            }
            return parsedData as T;
        }
        return null;
    } catch (e) {
        console.error('localStorageHelper.retrieve() error', e);
        return null;
    }
};

export const retrieveString = async (key: string): Promise<string | null> => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (e) {
        console.error('localStorageHelper.retrieve() error', e);
        return null;
    }
};

/**
 * Example:
 * const data = { name: "orhan", age: 36, gender: "male" }
 * store("@data:orhan", data);
 * storeOrUpdate("@data:orhan", { age: 37 })
 *
 * @param key
 * @param updatedPart
 */
export const storeOrUpdate = async <T>(key: string, updatedPart: any) => {
    try {
        const data = await retrieve<T>(key);
        if (!data) {
            store(key, updatedPart);
            return;
        }
        await AsyncStorage.mergeItem(key, JSON.stringify(updatedPart));
    } catch (e) {
        console.error('localStorageHelper.storeOrUpdate() error', e);
    }
};

export const remove = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('localStorageHelper.remove() error', e);
    }
};

export const clear = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('localStorageHelper.clear() error', e);
    }
};

export const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (e) {
        console.error('localStorageHelper.getAllKeys() error', e);
        return null;
    }
};

export const retrieveMultiple = async <T>(keys: string[]) => {
    try {
        const values = await AsyncStorage.multiGet(keys);
        if (!values) {
            return null;
        }
        return values.map((val, i) => {
            return JSON.parse(val[1]) as T;
        });
    } catch (e) {
        console.error('localStorageHelper.retrieveMultiple() error', e);
        return null;
    }
};

export const getItem = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error('localStorageHelper.getItem() error', e);
    }
};

/**
 * TODO implement others
 */

export default {
    getItem,
    store,
    storeOrUpdate,
    retrieve,
    retrieveString,
    remove,
    clear,
    getAllKeys,
    retrieveMultiple,

    base: AsyncStorage,
};
