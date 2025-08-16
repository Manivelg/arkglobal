// components/GlobalSearchInput.tsx
import { InputText } from "primereact/inputtext";
import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <InputText
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "6px 12px",
        borderRadius: "40px",
        fontSize: "0.875rem",
      }}
    />
  );
}
