export default function voteGarphCalc() {
  const graph: number[] = [1, 2, 3, 4];
  const graphTotal: number = graph.reduce((arr, cur) => arr + cur, 0);

  return { graph, graphTotal };
}
