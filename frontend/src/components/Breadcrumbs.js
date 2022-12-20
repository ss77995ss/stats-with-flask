import React from 'react';
import { useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  return (
    <div>
      <span></span>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={`breadcrumb-${index}`}>
          <span>{crumb}</span>
          {index !== crumbs.length - 1 && <span> / </span>}
        </React.Fragment>
      ))}
    </div>
  );
}
