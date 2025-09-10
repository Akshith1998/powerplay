import type { CardTypes } from "../../types";
import { LoadingState } from "../states/LoadingState";
import { ErrorState } from "../states/ErrorState";
import { EmptyState } from "../states/EmptyState";
import { Card } from "../card/Card";
import styles from "./CardList.module.scss";

interface CardListProps {
  repos: CardTypes[] | undefined;
  loading: boolean;
  error: string | null;
}

export const CardList = ({ repos, loading, error }: CardListProps) => {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!repos || repos.length === 0) return <EmptyState />;

  return (
    <div className={styles.root}>
      {repos.slice(0, 30).map((repo) => (
        <Card key={repo.id} repo={repo} />
      ))}
    </div>
  );
};
