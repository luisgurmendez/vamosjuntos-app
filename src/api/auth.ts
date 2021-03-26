import auth from '@react-native-firebase/auth';
import { southamericaFunctions } from "./functions";

export interface UserRegistrationValues {
  email: string;
  name: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export const login = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return auth().signOut();
};

export const register = async (values: UserRegistrationValues) => {
  const user = (await southamericaFunctions.httpsCallable('userRegister')(values)).data;
  await login(values.email, values.password);
  return user;
}

export const forgotPassword = async (email: string): Promise<void> => {
  return auth().sendPasswordResetEmail(email);
}

export const getFirebaseUser = () => {
  return auth().currentUser;
}
