import styles from './FilterToggle.module.scss'

interface FilterToggleProps {
  checked: boolean;
  onChange: () => void;
}

export const FilterToggle = ({ checked, onChange }: FilterToggleProps) => {
  return (
    <label className={styles.toggle}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.muted}>Bookmarked only</span>
    </label>
  );
};
