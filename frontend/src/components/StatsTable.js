import '../styles/components/StatTable.scss';

function Table({ children }) {
  return <table className="stats-table">{children}</table>;
}

function TableHeader({ children }) {
  return (
    <thead>
      <tr className="bg-secondary text-center">{children}</tr>
    </thead>
  );
}

function TableHeaderSortCell({ children, onClick }) {
  return (
    <th className="click-header" onClick={onClick}>
      {children}
    </th>
  );
}

function TableBody({ children }) {
  return <tbody className="text-center">{children}</tbody>;
}

export { Table, TableHeader, TableHeaderSortCell, TableBody };
