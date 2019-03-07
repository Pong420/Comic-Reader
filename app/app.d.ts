declare module 'axios-extensions';
declare module 'react-desktop/windows';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;
