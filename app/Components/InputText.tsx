interface InputTextProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

export default function InputText({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputTextProps) {
  return (
    <div className="mt-4">
      <label
        htmlFor={name}
        className="block mb-2 text-md font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-0"
      />
    </div>
  );
}