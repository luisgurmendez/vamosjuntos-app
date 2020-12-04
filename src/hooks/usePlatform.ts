import { useRef, useState } from "react";
import { Platform } from "react-native";

export enum OS {
  ANDROID = 'android',
  IOS = 'ios'
}

export function usePlatform() {

  const platform = useRef(Platform.OS);

  return {
    platform: platform.current,
    isAndroid: platform.current === OS.ANDROID,
    isIOS: platform.current === OS.IOS
  }

}