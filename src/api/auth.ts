import { User } from 'types/models';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
  const user = (await southamericaFunctions.httpsCallable('register')(values)).data;
  await login(values.email, values.password);
  return user;
}

export const forgotPassword = async (email: string): Promise<void> => {
  return auth().sendPasswordResetEmail(email);
}

export const getFirebaseUser = () => {
  return auth().currentUser;
}

export const getUser = async (): Promise<User | undefined> => {
  const fbUser = getFirebaseUser();
  if (fbUser) {
    const user = (await firestore().doc<User>(`users/${fbUser?.email}`).get()).data();
    return user;
  }

  return undefined;
}