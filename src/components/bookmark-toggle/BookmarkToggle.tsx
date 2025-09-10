import styles from "./BookmarkToggle.module.scss";

interface BookmarkToggleProps {
  isBookmarked: boolean;
  onToggle: () => void;
}

export const BookmarkToggle = ({
  isBookmarked,
  onToggle,
}: BookmarkToggleProps) => {
  return (
    <button
      aria-pressed={isBookmarked}
      onClick={onToggle}
      className={styles.bookmarkBtn}
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
};
