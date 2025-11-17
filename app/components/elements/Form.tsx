interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  options: { label: string; value: string | number }[];
  label: string;
  className?: string;
}
interface GeneralInputProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string | number;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "time" | "search";
  className?: string;
}

export function SelectInput({
  onChange,
  value,
  options,
  label,
  className,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-36 ${className}`}
    >
      <option value="">{label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
export function GeneralInput({
  onChange,
  value,
  placeholder,
  type,
  className,
}: GeneralInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-28 ${className}`}
    />
  );
}
