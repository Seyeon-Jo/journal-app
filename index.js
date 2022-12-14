//--------------- Start of showing-hiding sidebar menu ---------------//
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const userSideMenu = document.querySelector(".user");
const userBtn = document.querySelector("#user-btn");
const userCloseBtn = document.querySelector("#user-close-btn");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

userBtn.addEventListener("click", () => {
  userSideMenu.style.display = "block";
});

userCloseBtn.addEventListener("click", () => {
  userSideMenu.style.display = "none";
});
//--------------- End of showing-hiding sidebar menu ---------------//

//--------------- Start of random quote generator ---------------//
const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const quoteBtn = document.querySelector(".new-quote");

// random quote function
function randomQuote() {
  quoteBtn.innerText = "Loading Quote...";
  // fetching random quotes/data from the API and parsing it into JavaScript object
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
    });
}

quoteBtn.addEventListener("click", randomQuote);
//--------------- End of random quote generator ---------------//
