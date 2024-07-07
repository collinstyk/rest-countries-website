import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "../util/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariant> {
  children: ReactNode;
}

function Button({
  children,
  variant,
  size,
  text,
  shadow,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariant({ variant, size, text, shadow, className }))}
    >
      {children}
    </button>
  );
}

const buttonVariant = cva(
  "rounded-sm flex gap-2 border-none items-center" /*common styles to all buttons*/,
  {
    variants: {
      variant: {
        text: "bg-inherit",
        dark: "bg-element-dark text-dark",
        light: "bg-element-light text-light",
      },
      text: {
        dark: "text-dark",
        light: "text-light",
      },
      size: {
        sm: "text-sm px-5 py-1",
        md: "text-sm px-6 py-2 font-semibold",
      },
      shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      variant: "text",
      size: "sm",
    },
  },
);

export default Button;
