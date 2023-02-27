function allPathsSourceTarget(graph) {
    const n = graph.length;
    const paths = [];

    function dfs(node, path) {
        if (node === n - 1) {
            paths.push(path.slice());
            return;
        }
        for (const neighbor of graph[node]) {
            path.push(neighbor);
            dfs(neighbor, path);
            path.pop();
        }
    }

    dfs(0, [0]);
    return paths;
}

console.log(allPathsSourceTarget([[1, 2], [3], [3], []]));

// time complexity is O(V+E), where V is the number of nodes (vertices) in the graph, and E is the number of edges in the graph
// space complexity is O(V * L), where L is the length of the longest path in the graph.

