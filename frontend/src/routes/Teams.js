import { useLoaderData } from 'react-router-dom';
import StandingTable from '../components/StandingTable';
import News from '../components/News';

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
      <h3>News</h3>
      <News />
    </div>
  );
}
