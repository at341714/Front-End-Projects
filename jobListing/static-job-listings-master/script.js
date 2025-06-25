const jobListContainer = document.getElementById("job-listings");
const filterBar = document.getElementById("filter-bar");
const filterTagsContainer = document.getElementById("filter-tags");
const clearBtn = document.getElementById("clear-btn");

let selectedFilters = [];

async function fetchJobs() {
  const res = await fetch("data.json");
  const jobs = await res.json();
  renderJobs(jobs);
}

function renderJobs(jobs) {
  jobListContainer.innerHTML = "";

  let filtered;

  if (selectedFilters.length > 0) {
    // Filter the jobs: keep only jobs that match ALL selected tags
    filtered = jobs.filter(job => {
      // Create a list of tags this job has
      const jobTags = [job.role, job.level, ...job.languages, ...job.tools];

      // Check if every selected tag is found in the job's tags
      return selectedFilters.every(tag => jobTags.includes(tag));
    });
  } else {
    // No filters applied, show all jobs
    filtered = jobs;
  }

  // Now you can loop through `filtered` to render job cards
  // (This part likely happens later in the function)



 filtered.forEach(job => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
      <img src="${job.logo}" alt="${job.company}" />
      <div class="job-info">
        <h3>${job.company}</h3>
        <p><strong>${job.position}</strong></p>
        <p>${job.postedAt} • ${job.contract} • ${job.location}</p>
      </div>
      <div class="job-tags">
        ${[job.role, job.level, ...job.languages, ...job.tools]
          .map(tag => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>
    `

    jobListContainer.appendChild(card);
  });

  document.querySelectorAll(".tag").forEach(tagEl => {
    tagEl.addEventListener("click", () => {
      const tag = tagEl.textContent;
      if (!selectedFilters.includes(tag)) {
        selectedFilters.push(tag);
        updateFilterBar();
        fetchJobs();
      }
    });
  });
}

function updateFilterBar() {
  filterTagsContainer.innerHTML = selectedFilters
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  filterBar.classList.toggle("hidden", selectedFilters.length === 0);
}

clearBtn.addEventListener("click", () => {
  selectedFilters = [];
  updateFilterBar();
  fetchJobs();
});

fetchJobs();
