import TABS from './tabs/Screens';
import MODAL_SCREENS from './modal/Screens';

enum APP_SCREENS {
  TABS = 'TABS',
  MODAL = 'MODAL',
}

export type AppScreen = APP_SCREENS | typeof TABS | MODAL_SCREENS;
const AppScreens = { ...APP_SCREENS, ...TABS, ...MODAL_SCREENS };

export default AppScreens;
