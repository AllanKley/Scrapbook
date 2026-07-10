import { Link } from 'react-router-dom';

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="back-link">
      <span className="back-link-arrow">&larr;</span>
      <span>{label}</span>
    </Link>
  );
}
