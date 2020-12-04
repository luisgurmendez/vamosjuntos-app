import AUTH_SCREENS from './auth/Screens';
import APP_SCREENS from './app/Screens';
import WELCOME_SCREENS from './welcome/Screens';

enum ROOT_SCREENS {
  APP = 'APP',
  AUTH = 'AUTH',
  WELCOME = 'WELCOME'
}

export type Screen = AUTH_SCREENS | ROOT_SCREENS;
export const Screens = { ...ROOT_SCREENS, ...AUTH_SCREENS, ...APP_SCREENS, ...WELCOME_SCREENS };
