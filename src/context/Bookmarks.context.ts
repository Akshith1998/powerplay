import { createContext, useContext } from "react";
import type { CardTypes } from "../types";

export type State = Record<number, CardTypes>;

export type BookmarksContextType = {
  bookmarks: State;
  add: (repo: CardTypes) => void;
  remove: (id: number) => void;
  toggleBookmark: (repo: CardTypes) => void;
  isBookmarked: (id: number) => boolean;
};

export type Action =
  | { type: "init"; payload: State }
  | { type: "add"; payload: CardTypes }
  | { type: "remove"; payload: number };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return { ...state, [action.payload.id]: action.payload };
    case "remove": {
      const copy = { ...state };
      delete copy[action.payload];
      return copy;
    }
    default:
      return state;
  }
}

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export const useBookmarks = (): BookmarksContextType => {
  const ctx = useContext(BookmarksContext);
  if (!ctx)
    throw new Error("useBookmarks must be used inside BookmarksProvider");
  return ctx;
};
