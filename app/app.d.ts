declare module 'axios-extensions';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;
