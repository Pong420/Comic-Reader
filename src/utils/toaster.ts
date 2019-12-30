import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Position,
  IToasterProps,
  IToastOptions,
  Toaster as BpToaster
} from '@blueprintjs/core';

const props: IToasterProps = {
  position: Position.BOTTOM
};

const defaultOptions: Omit<IToastOptions, 'message'> = {
  timeout: 4000
};

const toaseter = BpToaster.create(props, document.body);

export const Toaster = {
  bottom(options: IToastOptions) {
    toaseter.clear();
    toaseter.show({
      ...defaultOptions,
      ...options,
      icon: 'info-sign',
      className: 'bottom-toaster',
      message: options.message
    });
  }
};

export function ClearTosterOnLocationChanged() {
  const location = useLocation();
  useEffect(() => {
    toaseter.clear();
  }, [location]);
  return null;
}
