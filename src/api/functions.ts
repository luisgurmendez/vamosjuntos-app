import { firebase } from '@react-native-firebase/functions';
const defaultApp = firebase.app();
export const southamericaFunctions = defaultApp.functions('southamerica-east1');
// southamericaFunctions.useFunctionsEmulator('http://localhost:5001');