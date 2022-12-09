import { useQuery } from 'react-query';

export default function News() {
  const { isLoading, error, data: news } = useQuery('news', () => fetch('api/news').then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`Error: ${error.message}`}</div>;

  return (
    <div className="container my-4">
      <div className="row">
        {news.map((item, index) => (
          <div className="col-3">
            <div className="card text-black h-100">
              <img className="card-img-top" src={item.image['@href']} alt={`news-${index}`} />
              <div className="card-body">
                <a href={item.link}>{item.title}</a>
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
