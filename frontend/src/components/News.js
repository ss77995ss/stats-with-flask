export default function News({ news }) {
  return (
    <div className="container my-4">
      <div className="row">
        {news.map((item, index) => (
          <div className="col-3">
            <div className="card text-black h-100">
              <img className="card-img-top" src={item.image['@href']} alt={`news-${index}`} />
              <div className="card-body">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <p className="card-text">{`${item['dc:creator'] || 'Unknown'} • ${new Date(
                  item.pubDate,
                ).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
