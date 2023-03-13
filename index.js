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

//----------------- Start of show current date -----------------//
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentDate = document.getElementById("current-date");
let today = new Date();
let month = months[today.getMonth()];
let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
let year = today.getFullYear();

currentDate.textContent = `${month} ${day}, ${year}`;
//----------------- End of show current date -----------------//

//----------------- Start of adding note -----------------//
const newBtn = document.querySelector(".new-btn");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header span");
const titleTag = popupBox.querySelector(".row input");
const descTag = popupBox.querySelector(".row textarea");
const addBtn = popupBox.querySelector(".content button");

// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// getting localstorage notes if exist and parsing them to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

newBtn.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a New Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".add-note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="add-note">
                    <div class="details">
                        <h3>${note.title}</h3>
                        <p>${note.description}</p>
                    </div>
                    <div class="bottom-content">
                        <small>${note.date}</small>
                        <div class="note-settings">
                            <span onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="material-icons-sharp"> edit </span>
                            <span onclick="deleteNote(${index})" class="material-icons-sharp"> delete </span>
                        </div>
                    </div>
                </li>`;
    newBtn.insertAdjacentHTML("beforebegin", liTag);
  });
}
showNotes();

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1); // removing selected note from array/tasks
  // saving updated notes to localstorage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  newBtn.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    // getting month, day, year from the current date
    let dateObj = new Date(),
      time = dateObj.toLocaleTimeString();
    // month = months[dateObj.getMonth()],
    // day = dateObj.getDate(),
    // year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${time}`,
      //date: `${month} ${day}, ${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo); // adding new note to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo; // updating specified note
    }

    // saving notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
//----------------- End of adding note -----------------//

/*//--------------- Start of showing-hiding sidebar menu ---------------//

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const userSideMenu = document.querySelector(".user");
const userBtn = document.querySelector("#user-btn");
const userCloseBtn = document.querySelector("#user-close-btn");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("visible");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("visible");
});

userBtn.addEventListener("click", () => {
  userSideMenu.classList.add("visible");
});

userCloseBtn.addEventListener("click", () => {
  userSideMenu.classList.remove("visible");
});

//--------------- End of showing-hiding sidebar menu ---------------//

//--------------- Start of random quote generator ---------------//

const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const quoteBtn = document.querySelector(".new-quote");

async function getRandomQuote() {
  quoteBtn.innerText = "Loading Quote...";
  try {
    const res = await fetch("https://api.quotable.io/random");
    const result = await res.json();
    console.log(result);
    quoteText.innerText = result.content;
    authorName.innerText = result.author;
    quoteBtn.innerText = "New Quote";
  } catch (error) {
    console.error(error);
    quoteBtn.innerText = "Error Occurred, Try Again";
  }
}

quoteBtn.addEventListener("click", getRandomQuote);

//--------------- End of random quote generator ---------------//

//----------------- Start of show current date -----------------//

const currentDate = document.getElementById("current-date");
const today = new Date();
const formattedDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
}).format(today);
currentDate.textContent = formattedDate;

//----------------- End of show current date -----------------//

//----------------- Start of adding note -----------------//

const newBtn = document.querySelector(".new-btn");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header span");
const titleTag = popupBox.querySelector(".row input");
const descTag = popupBox.querySelector(".row textarea");
const addBtn = popupBox.querySelector(".content button");
const notesList = document.querySelector(".notes-list");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

function showNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const { title, description, date } = note;
    const noteItem = (
      <li class="add-note">
        {" "}
        <div class="details">
          {" "}
          <h3>${title}</h3> <p>${description}</p>{" "}
        </div>{" "}
        <div class="bottom-content">
          {" "}
          <small>${date}</small>{" "}
          <div class="note-settings">
            {" "}
            <span onclick="updateNote(${index})" class="material-icons-sharp">
              {" "}
              edit{" "}
            </span>{" "}
            <span onclick="deleteNote(${index})" class="material-icons-sharp">
              {" "}
              delete{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </li>
    );
    notesList.insertAdjacentHTML("beforeend", noteItem);
  });
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}

function updateNote(index) {
  const { title, description } = notes[index];
  titleTag.value = title;
  descTag.value = description;
  addBtn;
}

// update note function
function updateNotes(updateId, noteTitle, noteDesc) {
  notes[updateId] = {
    title: noteTitle,
    description: noteDesc,
    date: notes[updateId].date,
  };
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

//----------------- End of adding note -----------------//*/
