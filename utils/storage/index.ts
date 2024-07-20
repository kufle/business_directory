import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageStoreData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e: any) {
    // saving error
  }
};

export const storageGetData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: any) {
    // error reading value
  }
};

export const storageRemoveMultiData = async (keys: any[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e: any) {
    // remove error
  }
};
