import rootReducer from "./reducers";

export type AppState = ReturnType<typeof rootReducer>;

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
