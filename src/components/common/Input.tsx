import React from "react";

interface Props {
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accept?: string;
}

export default function Input(props: Props) {
  const { name } = props;
  return (
    <label className="block mb-4">
      <span className="text-gray-300">{name}</span>
      <input
        {...props}
        className={`mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 outline-none p-2`}
      />
    </label>
  );
}
