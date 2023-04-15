import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(name, jsonValue)
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}


const getData = async (name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.error(e);
    return false;
  }
}


export default { getData, setData };
