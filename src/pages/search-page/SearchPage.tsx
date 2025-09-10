import { useCallback, useMemo, useState } from "react";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { FilterToggle } from "../../components/filter-toggle/FilterToggle";
import { CardList } from "../../components/card-list/CardList";
import { useBookmarks } from "../../context/Bookmarks.context";
import { useFetchRepos } from "../../hooks/useFetchRepos";
import styles from "./SearchPage.module.scss";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const { bookmarks } = useBookmarks();

  const debouncedQuery = query; // SearchBar handles debounce and only calls onDebouncedChange

  const { data, loading, error } = useFetchRepos(debouncedQuery);

  // derive list (cap to 30 in service)
  const items = useMemo(() => {
    const list = data ?? [];
    if (bookmarkedOnly) {
      // bookmarks is a map keyed by id
      return list.filter((r) => Boolean(bookmarks[r.id]));
    }
    return list;
  }, [data, bookmarkedOnly, bookmarks]);

  const onQueryChange = useCallback((q: string) => setQuery(q), []);
  const onToggleFilter = useCallback(() => setBookmarkedOnly((v) => !v), []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <SearchBar onQueryChange={onQueryChange} />
        <FilterToggle checked={bookmarkedOnly} onChange={onToggleFilter} />
      </div>

      <CardList repos={items} loading={loading} error={error} />
    </div>
  );
};
