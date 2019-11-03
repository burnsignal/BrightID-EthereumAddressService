import React from "react";

interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ handleChange }: InputProps) => {
  return (
    <div>
      <input onInput={handleChange} />
    </div>
  );
};

export default Input;
