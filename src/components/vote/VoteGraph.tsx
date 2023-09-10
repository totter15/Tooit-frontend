import voteGarphCalc from '../../utils/voteGraphCalc';

function VoteGraph() {
  const { graph, graphTotal } = voteGarphCalc();

  return (
    <section className="vote-result">
      <ul className="vote-result__graph">
        {graph.map((item) => (
          <li
            key={item}
            style={{ width: `${(item / graphTotal) * 100}%` }}
            className="vote-result__graph-item"
          >
            <div>{item}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default VoteGraph;
