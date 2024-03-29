import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
}

const TextArea: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  disabled,
  placeholder = "",
}) => {
  return (
    <div className="my-3">
      <label
        htmlFor={id}
        className="
          text-sm 
          font-medium 
          leading-6 
          text-gray-500
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          autoComplete={id}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id, { required })}
          className={clsx(
            `
            form-input,
            w-full 
	    h-28
            rounded-md 
            border-0
	    px-1.5
            py-1.5 
            text-gray-800 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-500
            sm:text-sm 
            sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default",
          )}
        />
      </div>
    </div>
  );
};

export default TextArea;
