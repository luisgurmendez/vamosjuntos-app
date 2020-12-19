import { useSelector } from 'react-redux';
import { AppState } from 'state/types';

function useFeatureFlag(flagName: string): boolean {
  const fFlag = useSelector<AppState>(state => state.featureFlags.featureFlags[flagName]);
  return !!fFlag;
}

export default useFeatureFlag;
