import TABS from './tabs/Screens';
import MODAL_SCREENS from './modal/Screens';
import WELCOME_SCREENS from './welcome/Screens';

enum APP_SCREENS {
  TABS = 'TABS',
  MODAL = 'MODAL',
  WELCOME = 'WELCOME'
}

export type AppScreen = APP_SCREENS | typeof TABS | MODAL_SCREENS;
const AppScreens = { ...APP_SCREENS, ...TABS, ...MODAL_SCREENS, ...WELCOME_SCREENS };

export default AppScreens;
