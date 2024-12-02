const Select = ({ value, onChange, options, className }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`p-2 rounded ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
