import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createAction } from '@reduxjs/toolkit';
import { Passenger, Ride, User } from 'types/models';
import { withPayloadType } from '../types';

export const setUser = createAction('[USER] SET_USER', withPayloadType<User | undefined>());
export const setIsLoggedIn = createAction('[USER] SET_ISLOGGEDIN', withPayloadType<boolean>());
export const setOwesReview = createAction('[USER] SET_OWES_REVIEW', withPayloadType<Passenger | undefined>());
export const logout = createAction('[USER] LOGOUT');
export const login = createAction('[USER] LOGIN', withPayloadType<User | undefined>());