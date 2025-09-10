import { useCallback } from "react";
import type { CardTypes } from "../../types";
import { compactNumber } from "../../utils/format";
import { BookmarkToggle } from "../bookmark-toggle/BookmarkToggle";
import { useBookmarks } from "../../context/Bookmarks.context";
import styles from "./Card.module.scss";

interface CardInnerProps {
  repo: CardTypes;
}

export const Card = ({ repo }: CardInnerProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);
  const onToggle = useCallback(
    () => toggleBookmark(repo),
    [repo, toggleBookmark]
  );

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <img
            className={styles.avatar}
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
          />
          <div>
            <div className={styles.repoName}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.full_name}
              </a>
            </div>
            <div className={styles.description}>{repo.description || ""}</div>
            <div className={styles.meta}>
              <span>⭐ {compactNumber(repo.stargazers_count)}</span>
              {repo.language && <span>{repo.language}</span>}
              <span className={styles.updated}>
                Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.cardActions}>
          <BookmarkToggle isBookmarked={bookmarked} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
};
