import styles from "./Input.module.css";

const Input = ({
  id,
  placeholder,
  type = "text",
  value,
  onChange,
  ...rest
}) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      className={`${styles.input}`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
