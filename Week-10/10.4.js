function validPath(n, edges, source, destination) {
    const adjList = buildAdjList(n, edges);
    const visited = new Array(n).fill(false);
    const queue = [source];
    visited[source] = true;

    while (queue.length > 0) {
        const curr = queue.shift();
        if (curr === destination) {
            return true;
        }
        for (const neighbor of adjList[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    return false;
}

function buildAdjList(n, edges) {
    const adjList = new Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        adjList[u].push(v);
        adjList[v].push(u);
    }
    return adjList;
}

console.log(validPath(6, [[0, 1], [1, 2], [2, 0]], 0, 2));

// time complexity is O(n + m) and the space complexity is O(n + m)