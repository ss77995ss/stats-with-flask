import { useLoaderData } from 'react-router-dom';
import { useQuery } from 'react-query';
import StandingTable from '../components/StandingTable';
import NewsCarousel from '../components/NewsCarousel';

export default function Teams() {
  const { standings } = useLoaderData();
  return (
    <div>
      <h3>Teams</h3>
      <div className="container">
        <div className="row row-cols-2">
          <div className="col">
            <StandingTable division="AL East" standing={standings['AL East']} />
          </div>
          <div className="col">
            <StandingTable division="NL East" standing={standings['NL East']} />
          </div>
          <div className="col">
            <StandingTable division="AL Central" standing={standings['AL Central']} />
          </div>
          <div className="col">
            <StandingTable division="NL Central" standing={standings['NL Central']} />
          </div>
          <div className="col">
            <StandingTable division="AL West" standing={standings['AL West']} />
          </div>
          <div className="col">
            <StandingTable division="NL West" standing={standings['NL West']} />
          </div>
        </div>
      </div>
      <MlbNews />
    </div>
  );
}

function MlbNews() {
  const { isLoading, error, data: news } = useQuery('news', () => fetch('api/news').then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`Error: ${error.message}`}</div>;

  return (
    <div>
      <h3>News</h3>
      <NewsCarousel news={news} />
    </div>
  );
}
