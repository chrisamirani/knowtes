'use client';

import 'react-toastify/dist/ReactToastify.css';

import {
  toast as defaultToast,
  ToastContainer,
  ToastOptions,
} from 'react-toastify';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function toast(msg: string, options: ToastOptions) {
  defaultToast(msg, {
    position: 'top-right',
    autoClose: 3000,
    ...options,
  });
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
