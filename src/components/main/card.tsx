import React from "react";

type CardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

//------------------------
const Card = ({ title, subtitle, children, actions, className = "" }: CardProps) => {
  return (
    <div
      className={`
        relative rounded-xl
        bg-white dark:bg-darkBg
        shadow-md dark:shadow-lg
        border border-gray-200/70 dark:border-white/10
        p-5 flex flex-col gap-4 transition-all z-0
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="flex flex-col gap-1">
          {title && <h5 className="text-xl font-semibold">{title}</h5>}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}

      {actions && (
        <div className="flex justify-end items-center gap-3 pt-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;
