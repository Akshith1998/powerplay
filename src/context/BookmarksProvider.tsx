import React, { useMemo, useReducer, useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CardTypes } from "../types";
import { BookmarksContext, reducer, type State } from "./Bookmarks.context";

export const BookmarksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [persistValue, setPersistValue] = useLocalStorage<State>(
    "gh_bookmarks",
    {}
  );
  const [state, dispatch] = useReducer(reducer, persistValue ?? {});

  useEffect(() => {
    setPersistValue(state);
  }, [state, setPersistValue]);

  const add = useCallback(
    (repo: CardTypes) => dispatch({ type: "add", payload: repo }),
    [dispatch]
  );
  const remove = useCallback(
    (id: number) => dispatch({ type: "remove", payload: id }),
    [dispatch]
  );
  const toggleBookmark = useCallback(
    (repo: CardTypes) => {
      if (state[repo.id]) remove(repo.id);
      else add(repo);
    },
    [state, add, remove]
  );
  const isBookmarked = useCallback((id: number) => Boolean(state[id]), [state]);

  const value = useMemo(
    () => ({
      bookmarks: state,
      add,
      remove,
      toggleBookmark,
      isBookmarked,
    }),
    [state, add, remove, toggleBookmark, isBookmarked]
  );

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksProvider;
