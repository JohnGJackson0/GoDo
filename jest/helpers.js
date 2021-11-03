import { Platform } from "react-native";

//use jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
export function getOS() {
  return Platform.OS;
}
