export type UseCasePort<S extends Record<string, any>, E extends (...args: any[]) => any> = (
  services: S
) => {
  execute: E;
};
