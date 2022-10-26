import firebaseAuth from '@react-native-firebase/auth';

const auth = firebaseAuth()

export interface UserRegistrationValues {
  email: string;
  name: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export const login = async (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return auth.signOut();
};

export const forgotPassword = async (email: string): Promise<void> => {
  return auth.sendPasswordResetEmail(email);
}

export const getFirebaseUser = () => {
  return auth.currentUser;
}
