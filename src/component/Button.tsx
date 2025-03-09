import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>;

export const buttonStyles = cva(
  ['font-semibold', 'transition-colors', 'rounded'],
  {
    variants: {
      variant: {
        default: ['bg-neutral-800', 'hover:bg-secondary-hover'],
        ghost: ['hover:bg-gray-100'],
        dark: [
          'bg-secondary-dark',
          'hover:bg-secondary-dark',
          'text-secondary',
        ],
      },
      intent: {
        primary: [
          'hover:bg-secondary:hover',
          'text-white',
          'border-transparent',
        ],
        // **or**
        // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
        secondary: ['bg-white', 'text-gray-800', 'border-gray-400'],
      },
      size: {
        default: ['rounded', 'p-2'],
        icon: [
          'rounded-full',
          'w-10',
          'h-10',
          'flex',
          'items-center',
          'justify-center',
          'p-2.5',
        ],
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};
