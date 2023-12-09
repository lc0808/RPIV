import React, { CSSProperties, ComponentProps } from 'react';
import 'tailwindcss/tailwind.css';
import { cn } from '../../utils/cn';
import 'src/renderer/components/Button/index.css';

type ButtonProps = ComponentProps<'button'> & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

function Button({
  children,
  className,
  icon,

  ...props
}: ButtonProps) {
  return (
    <button type="button" className={className} {...props}>
      {children}
      {icon}
    </button>
  );
}

export default Button;
