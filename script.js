// Exam warning alert (shown on page load)
window.onload = function () {
    alert("⚠️ WARNING:\nIf you use AI, you will be dismissed from the test.");
};
setInterval(function() {
    alert("⚠️ WARNING: 10 minutes have passed.\nIf you use AI, you will be dismissed from the test.");
}, 600000); // every 10 minutes


let editor;

require.config({
    paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs" }
});

require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById("editor"), {
    value:
`/*
  HARD PROBLEM:
  Longest Path in DAG from 1 to N using at most K edges
*/

function longestPathWithKEdges(n, edges, k) {
    // Build adjacency list
    const graph = Array.from({ length: n + 1 }, () => []);
    const indegree = Array(n + 1).fill(0);

    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        indegree[v]++;
    }

    // Topological Sort (Kahn's Algorithm)
    const queue = [];
    for (let i = 1; i <= n; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    const topo = [];
    while (queue.length) {
        const node = queue.shift();
        topo.push(node);
        for (const [next] of graph[node]) {
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
        }
    }

    // dp[node][usedEdges] = max path sum
    const dp = Array.from({ length: n + 1 }, () =>
        Array(k + 1).fill(-Infinity)
    );

    dp[1][0] = 0;

    for (const u of topo) {
        for (let used = 0; used < k; used++) {
            if (dp[u][used] === -Infinity) continue;

            for (const [v, w] of graph[u]) {
                dp[v][used + 1] = Math.max(
                    dp[v][used + 1],
                    dp[u][used] + w
                );
            }
        }
    }

    let answer = -Infinity;
    for (let i = 0; i <= k; i++) {
        answer = Math.max(answer, dp[n][i]);
    }

    return answer === -Infinity ? "IMPOSSIBLE" : answer;
}

// Sample Test
const n = 5;
const edges = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 4, 4],
    [3, 4, -1],
    [4, 5, 6]
];
const k = 3;

console.log(longestPathWithKEdges(n, edges, k));`,
    language: "javascript",
    theme: "vs-dark"
});

});

// Run Code (browser simulation)
function runCode() {
    try {
        let output = "";
        console.log = (msg) => output += msg + "\n";

        eval(editor.getValue());

        document.getElementById("result").textContent =
            output || "Code executed successfully ✔️";
    } catch (err) {
        document.getElementById("result").textContent = err;
    }
}

// Timer
let seconds = 3600;
setInterval(() => {
    seconds--;
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    document.getElementById("time").textContent =
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}, 1000);
