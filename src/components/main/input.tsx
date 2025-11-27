import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth, className = "", ...props }, ref) => {
    const base =
      "w-full px-3 py-2 rounded-md border transition-all outline-none";
      
    const normalBorder =
      "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400";
      
    const errorBorder =
      "border-red-500 dark:border-red-400 focus:border-red-600 dark:focus:border-red-500";

    const finalBorder = error ? errorBorder : normalBorder;

    return (
      <div className={fullWidth ? "w-full" : "w-fit"}>
        {label && (
          <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`${base} ${finalBorder} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${className}`}
          {...props}
        />

        {helperText && (
          <p
            className={`mt-1 text-xs ${
              error
                ? "text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
