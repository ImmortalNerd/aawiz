import { IconLoading } from "@/icons/icon-loading";
import React, { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "contained" | "outlined" | "ghost";
  color?: "primary" | "secondary" | "danger" | "info" | "warning" | "success";
  loading?: boolean;
  startIcon?: React.ReactNode;
};

const sizeClasses = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-[14px]",
  lg: "px-5 py-3 text-lg",
};

const variantClasses = {
  contained: "border-none",
  outlined: "border bg-transparent",
  ghost: "bg-transparent border-none",
};

const colorClasses = {
  primary: {
    contained: "bg-primary text-white hover:bg-primaryHover",
    outlined: "border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  },
  secondary: {
    contained: "bg-gray-600 text-white hover:bg-gray-700",
    outlined: "border-gray-600 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
  },
  danger: {
    contained: "bg-red-600 text-white hover:bg-red-700",
    outlined: "border-red-600 text-red-600 hover:bg-red-100",
    ghost: "text-red-600 hover:bg-red-100",
  },
  info: {
    contained: "bg-blue-600 text-white hover:bg-blue-700",
    outlined: "border-blue-600 text-blue-600 hover:bg-blue-100",
    ghost: "text-blue-600 hover:bg-blue-100",
  },
  warning: {
    contained: "bg-amber-500 text-black hover:bg-amber-600",
    outlined: "border-amber-500 text-amber-600 hover:bg-amber-100",
    ghost: "text-amber-600 hover:bg-amber-100",
  },
  success: {
    contained: "bg-green-600 text-white hover:bg-green-700",
    outlined: "border-green-600 text-green-700 hover:bg-green-100",
    ghost: "text-green-700 hover:bg-green-100",
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      variant = "contained",
      color = "primary",
      loading = false,
      className = "",
      children,
      disabled,
      startIcon,
      ...props
    },
    ref
  ) => {
    const classes = `
      relative flex items-center justify-center
      rounded-lg transition-all shadow-md cursor-pointer select-none
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${colorClasses[color][variant]}
      ${loading ? "opacity-70 cursor-default" : ""}
      ${className}
    `;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {startIcon ? (
          <div
            className={`flex gap-3 justify-center items-center transition-opacity ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            {startIcon}
            <span>{children}</span>
          </div>
        ) : (
          <span
            className={`${
              loading ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          >
            {children}
          </span>
        )}

        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <IconLoading />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
