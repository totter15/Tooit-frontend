import voteGarphCalc from '../../utils/voteGraphCalc';

function MobileVoteGraph() {
  const { graph, graphTotal } = voteGarphCalc();
  return (
    <section className="vote-result mobile">
      <div className="sub-title">투표 현황</div>
      <ul className="vote-result__graph">
        {graph.map((item) => (
          <li
            style={{ width: `${(item / graphTotal) * 100}%` }}
            className="vote-result__graph-item"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MobileVoteGraph;
