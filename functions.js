const owner = "AdvanturePie";
const repo = "jekida-site";
let alleCommits = [];

fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`)
  .then(response => response.json())
  .then(commits => {
    alleCommits = commits;
    renderCommits(commits);
  })
  .catch(error => {
    const timeline = document.getElementById("timeline");
    if (timeline) {
      timeline.innerText = "Error while loading commits 😢";
    }
    console.error(error);
  });

function renderCommits(commits) {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  timeline.innerHTML = "";

  commits.forEach(commit => {
    const div = document.createElement("div");
    div.className = "commit";
    div.innerHTML = `
      <strong>${commit.commit.message}</strong><br>
      <time>${new Date(commit.commit.author.date).toLocaleString()}</time><br>
      by <em>${commit.commit.author.name}</em><br>
      <a href="${commit.html_url}" target="_blank">View commit</a>
    `;
    timeline.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const zoekInput = document.getElementById("zoek");
  if (zoekInput) {
    zoekInput.addEventListener("input", (e) => {
      const zoekterm = e.target.value.toLowerCase();
      const gefilterd = alleCommits.filter(commit => {
        const message = commit.commit.message.toLowerCase();
        const auteur = commit.commit.author.name.toLowerCase();
        return message.includes(zoekterm) || auteur.includes(zoekterm);
      });
      renderCommits(gefilterd);
    });
  }
});