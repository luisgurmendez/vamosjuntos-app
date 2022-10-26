import { FeatureFlag, FeatureFlags } from 'types/models';
import remoteConfig from '@react-native-firebase/remote-config';

export const getFeatureFlags = async (): Promise<FeatureFlag[]> => {
  await remoteConfig().fetch(0);
  await remoteConfig().activate();
  const configs = remoteConfig().getAll();
  const featureFlags: FeatureFlag[] = [];
  const booleanFFlagNames: string[] = Object.values(FeatureFlags);
  Object.keys(configs).filter((configKey) => booleanFFlagNames.includes(configKey)).forEach(configKey => {
    featureFlags.push({
      name: configKey,
      enabled: configs[configKey].asBoolean()
    })
  })

  return featureFlags;
};
