import { useEffect, useState, useCallback, type ChangeEvent } from "react";
import { useDebouncedValue } from "./useDebouncedValue";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onQueryChange: (q: string) => void;
}

export const SearchBar = ({ onQueryChange }: SearchBarProps) => {
  const [value, setValue] = useState("");
  const debounced = useDebouncedValue(value, 350);

  useEffect(() => {
    onQueryChange(debounced);
  }, [debounced, onQueryChange]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const clear = useCallback(() => setValue(""), []);

  return (
    <div className={styles.root}>
      <input
        aria-label="Search GitHub repositories"
        className={styles.input}
        placeholder="Search repositories..."
        value={value}
        onChange={onChange}
      />
      <button className={styles.clearBtn} onClick={clear} aria-label="Clear search">
        Clear
      </button>
    </div>
  );
};
