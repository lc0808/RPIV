/* eslint-disable react/button-has-type */
import React, { ComponentProps } from 'react';
import 'tailwindcss/tailwind.css';
import { cn } from '../../utils/cn';

type ButtonPasswordProps = ComponentProps<'button'> & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

function ButtonPassword({
  children,
  icon,
  className,
  ...props
}: ButtonPasswordProps) {
  return (
    <button
      type="button"
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

export default ButtonPassword;
