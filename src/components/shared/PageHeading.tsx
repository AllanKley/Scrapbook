import type { PropsWithChildren } from 'react';
import { BackLink } from './BackLink';

interface PageHeadingProps extends PropsWithChildren {
  backTo: string;
  backLabel: string;
}

export function PageHeading({ backTo, backLabel, children }: PageHeadingProps) {
  return (
    <div className="page-heading-row">
      <BackLink to={backTo} label={backLabel} />
      <h2 className="section-heading">{children}</h2>
    </div>
  );
}
