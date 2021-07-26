import React from 'react';

export interface InputType {
  type: string;
  onChange: (value: React.FormEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  prefixIcon?: string;
  value: string;
  placeholder?: string;
  name: string;
  className?: string;
  error: boolean | string | undefined;
}

export interface CheckBoxType {
  name: string;
  label: string;
  value: string;
  className?: string;
  onChange: (value: React.FormEvent<HTMLInputElement>) => void;
}

export interface ButtonType {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  type?: 'submit';
}

export interface LoginRegisterForm {
  onChange: () => void;
}
