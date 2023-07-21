import AsyncStorage from '@react-native-async-storage/async-storage';

const setDataAsync = (name, value) => {
  try {
    const json = JSON.stringify(value);
    AsyncStorage.setItem(name, json);
    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
}

const setData = async (name, value) => {
  try {
    const json = JSON.stringify(value)
    await AsyncStorage.setItem(name, json)
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}


const getData = async (name) => {
  try {
    const json = await AsyncStorage.getItem(name);
    return json != null ? JSON.parse(json) : null;
  } catch(e) {
    console.error(e);
    return false;
  }
}


export default { getData, setData, setDataAsync };
