import { createAction } from '@reduxjs/toolkit';
import { Passenger, User } from 'types/models';
import { withPayloadType } from '../types';

export const setUser = createAction('[USER] SET_USER', withPayloadType<User | undefined>());
export const setIsLoggedIn = createAction('[USER] SET_ISLOGGEDIN', withPayloadType<boolean>());
export const setOwesReview = createAction('[USER] SET_OWES_REVIEW', withPayloadType<Passenger | undefined | null>());
export const logout = createAction('[USER] LOGOUT');