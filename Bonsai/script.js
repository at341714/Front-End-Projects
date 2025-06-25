const toggle =document.getElementById("pricing-toggle");
const monthlyPrice = document.querySelectorAll(".monthly-price");
const yearlyPrice = document.querySelectorAll(".yearly-price");


toggle.addEventListener("change", () => {
  if(toggle.checked){
    monthlyPrice.forEach(p => p.classList.add("hidden"));
    yearlyPrice.forEach(p => p.classList.remove("hidden"));
  } else {
    yearlyPrice.forEach(p => p.classList.add("hidden"));
    monthlyPrice.forEach(p => p.classList.remove("hidden"));
  }
})


const faq = document.querySelectorAll(".faq-question");

faq.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling
    if(answer.style.display === "block"){
      answer.style.display = "none"
    }else {
      answer.style.display = "block";
    }
  })
})