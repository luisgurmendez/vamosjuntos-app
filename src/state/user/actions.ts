import { createAction } from '@reduxjs/toolkit';
import { User } from 'types/models';
import { withPayloadType } from '../types';

export const setUser = createAction('[USER] SET_USER', withPayloadType<User | undefined>());