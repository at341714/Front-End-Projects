const jobListingContainer = document.getElementById("job-listings");
const filterTags = document.getElementById("filter-tag");
const clearBtn = document.getElementById("clear-button");

let selectedFilters = [];

async function fetchJobs(){
  const res = await fetch("data.json");
  const jobs = await res.json();
  renderJobs(jobs)
}

function renderJobs(jobs){
  jobListingContainer.innerHTML = "";
  
  let filtered;

  if(selectedFilters.length > 0){
  filtered = jobs.filter(job => {
    const jobTags = [job.level,job.role,...job.languages,...job.tools]

    return selectedFilters.every(tag => jobTags.includes(tag))
  })
} else {
  filtered = jobs;
  }

  filtered.forEach(job => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
    <img src="${job.logo}" alt="${job.company}">
    <div class="job-info">
    <p>${job.company}</p>
    <p><strong>${job.position}</strong></p>
    <span>${job.postedAt} . ${job.contract} .${job.location}</span>
    </div>
   
    <div class="job-tag">
    ${[job.level , job.role , ...job.languages , ...job.tools]
    .map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    `

    jobListingContainer.appendChild(card)
    
  })


 document.querySelectorAll(".tag").forEach(tagEl => {
  tagEl.addEventListener("click", () => {
    const tag = tagEl.textContent;

    if (selectedFilters.includes(tag)) {
      // Remove the tag from selectedFilters
      selectedFilters = selectedFilters.filter(t => t !== tag);
    } else {
      // Add the tag if not already in the list
      selectedFilters.push(tag);
    }

    updateFilterBar();
    fetchJobs();
  });
});




}

function updateFilterBar(){

  filterTags.innerHTML = selectedFilters
  .map(tag => `<span class="tag">${tag}</span>`).join("")
}

clearBtn.addEventListener("click" ,()=> {
  selectedFilters = [];
  updateFilterBar();
  fetchJobs();
})

fetchJobs();