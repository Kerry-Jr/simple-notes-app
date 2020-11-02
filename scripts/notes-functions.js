"use strict";
// let data
// const processData = () => {
//   data = '1232443'
// }

// processData()
// console.log(data)

// read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// remove note from list by ID

const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// generate DOM structure for note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p")
  // const button = document.createElement("button");

  // button.textContent = " X";
  // noteEl.appendChild(button);
  // button.addEventListener("click", () => {
  //   removeNote(note.id);
  //   saveNotes(notes);
  //   renderNotes(notes, filters);
  // });

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "No Notes yet";
  }
  
  textEl.classList.add("list-item__title")
  noteEl.appendChild(textEl);

  //setup link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item")

  //setup status msg
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add("list-item__subtitle")
  noteEl.appendChild(statusEl)

  return noteEl;
};

//sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// render application notes

const renderNotes = (notes, filters) => {
  const notesEl =  document.querySelector("#notes")
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if(filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No Notes to show'
    emptyMessage.classList.add('empty-message')
    notesEl.appendChild(emptyMessage)

  }
};
// save notes localStorage function

const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const generateLastEdited = (timeStamp) =>
  `Last edited ${moment(timeStamp).fromNow()}`;
