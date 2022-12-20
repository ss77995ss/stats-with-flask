import { useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));
  console.log(matches);
  return (
    <div>
      <span></span>
      {crumbs.map((crumb, index) => (
        <>
          <span key={`breadcrumb-${index}`}>{crumb}</span>
          {index !== crumbs.length - 1 && <span> / </span>}
        </>
      ))}
    </div>
  );
}
