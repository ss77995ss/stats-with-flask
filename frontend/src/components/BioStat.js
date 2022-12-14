export default function BioStat({ labelText, description }) {
  return (
    <div className="m-2">
      <label className="text-secondary" style={{ fontSize: '.75rem' }}>
        {labelText}
      </label>
      <p>{description}</p>
    </div>
  );
}
