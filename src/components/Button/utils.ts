import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useSilentDisabled(duration: number = 200): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [silentDisabled, setSilentDisabled] = useState(false);

  useEffect(() => {
    if (silentDisabled) {
      setTimeout(() => {
        setSilentDisabled(false);
      }, duration)
    }
  }, [silentDisabled])

  return [silentDisabled, setSilentDisabled];
}