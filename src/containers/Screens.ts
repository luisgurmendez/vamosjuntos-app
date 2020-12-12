import AUTH_SCREENS from './auth/Screens';
import APP_SCREENS from './app/Screens';
import WELCOME_SCREENS from './app/welcome/Screens';

enum ROOT_SCREENS {
  APP = 'APP',
  AUTH = 'AUTH',
}

export type Screen = AUTH_SCREENS | ROOT_SCREENS;
export const Screens = { ...ROOT_SCREENS, ...AUTH_SCREENS, ...APP_SCREENS };
