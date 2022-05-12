import React, { useState } from "react";
import Notecontext from "./noteContext";

const Notestate = (props) => {
  const host = `http://localhost:5000`
  // const notesinitial = []

  const [notes, setnotes] = useState([]);

  // add a Note...............................................
  const addNote = async (title, discription, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, discription, tag })
    });
    const note = await response.json();
    setnotes(notes.concat(note));

  }

  //get all notes.............................
  const getNotes = async () => {
    // e.preventDefault();
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }

  // delete a Note....................................
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json)

    console.log("deleting the note with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);

  }

  // update a Note...................................
  const editNote = async (id, title, discription, tag) => {

    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, discription, tag })
    });
    const json = await response.json();
    console.log(json);

    //logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.discription = discription;
        element.tag = tag;
      }
    }
    console.log('updating the note' + id);

  }
  return (
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </Notecontext.Provider>

  )
}

export default Notestate