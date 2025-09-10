import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import BookmarksProvider from "./context/BookmarksProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookmarksProvider>
      <App />
    </BookmarksProvider>
  </StrictMode>
);
