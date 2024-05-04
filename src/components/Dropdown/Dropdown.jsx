import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null)

  const handleClick = useCallback(() => setDropdown(prev => !prev), []);

  useEffect(() => {
    const handleClicOutside = (event) => {
        if(dropdownRef  && !dropdownRef.current?.contains(event.target)) {
            setDropdown(false)
        }
    }

    document.addEventListener('mousedown', handleClicOutside)

    return () => {
        document.removeEventListener('mousedown', handleClicOutside)
    }
  }, [])
  return (
    <div ref={dropdownRef} onClick={handleClick} className={styles.dropdown}>
      <span className={`${value ? styles.selectedOption: ""}`}>{value || placeholder}</span>

      {dropdown && (
        <ul className={styles.options}>
          {options.map((option, i) => {
            return (
              <li
                key={i}
                onClick={() => onChange(option.value)}
                className={`${styles.option} ${value === option.value ? styles.active : ""}`}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
