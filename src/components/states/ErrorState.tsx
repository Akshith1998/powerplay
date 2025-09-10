export const ErrorState = ({ message }: { message?: string | null }) => {
  return (
    <div className="card">
      <div className="empty">Error: {message ?? "Something went wrong"}</div>
    </div>
  );
};
