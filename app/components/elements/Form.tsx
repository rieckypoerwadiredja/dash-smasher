import { ReactNode } from "react";
import { Paragraph } from "./Text";

interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  options: { label: string; value: string | number }[];
  label: string;
  className?: string;
  firstOption?: string;
}
interface GeneralInputProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  id?: string;
  value: string | number;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "time" | "search";
  className?: string;
  label?: string;
}
interface CheckboxInputProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: ReactNode;
  className?: string;
}

export function SelectInput({
  onChange,
  value,
  options,
  label,
  className,
  firstOption,
}: SelectInputProps) {
  return (
    <>
      <Paragraph className="text-black! font-medium">{label}</Paragraph>
      <div className="mt-2">
        <select
          value={value}
          onChange={onChange}
          className={`shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-36 ${className}`}
        >
          {firstOption && <option value="">{firstOption}</option>}
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export function SelectInputSkeleton({ className = "" }) {
  return (
    <div>
      {/* Skeleton label */}
      <Paragraph>
        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
      </Paragraph>

      {/* Skeleton dropdown */}
      <div className="mt-2">
        <div
          className={`shadow bg-gray-300 animate-pulse rounded-lg px-3 py-2 w-36 ${className}`}
        >
          <div className="h-4 w-20 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function GeneralInput({
  id,
  onChange,
  value,
  placeholder,
  type,
  className,
  label,
}: GeneralInputProps) {
  return (
    <>
      {label && (
        <Paragraph className="text-black! font-medium">{label}</Paragraph>
      )}
      <div className="mt-2">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-28 ${className}`}
        />
      </div>
    </>
  );
}

export function GeneralInputSkeleton({ className = "" }) {
  return (
    <div>
      {/* Skeleton label */}
      <Paragraph>
        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
      </Paragraph>

      {/* Skeleton input */}
      <div className="mt-2">
        <div
          className={`shadow bg-gray-300 animate-pulse rounded-lg px-3 py-2 w-28 ${className}`}
        >
          <div className="h-4 w-16 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}
export function CheckboxInput({
  checked,
  onChange,
  label,
  className,
}: CheckboxInputProps) {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border cursor-pointer border-gray-400 rounded bg-white focus:ring-2 focus:ring-orange-300"
      />
      <span className="ml-2 text-sm font-medium text-gray-800 select-none">
        {label}
      </span>
    </label>
  );
}

export function CheckboxInputSkeleton({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-4 h-4 bg-gray-300 animate-pulse rounded"></div>
      <div className="ml-2 h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
    </div>
  );
}
