import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PRIORITY_LEVELS } from './../config';


function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }


  function addNote(newNote) {
    // Set default priority if none is provided
    if (!newNote.priority) {
      newNote.priority = "Low";
    }

    const processNote = (note) => {
      const newNotes = [...notes, note];
      setNotes(newNotes);
      toast("New Note Added!");
      localStorage.setItem("notes", JSON.stringify(newNotes));
    };

    if (newNote.attachment) {
      const reader = new FileReader();
      reader.readAsDataURL(newNote.attachment);
      reader.onload = () => {
        const modifiedNote = { ...newNote, attachment: reader.result };
        processNote(modifiedNote);
      };
      reader.onerror = error => {
        console.log('Error: ', error);
        toast("Failed to add attachment!");
      };
    }
    else {
      if (!newNote.title.trim()) {
        return;
      }
      processNote(newNote);
    }
  }


  function deleteNote(id) {
    const updatedNotes = notes.filter((noteItem, index) => index !== id);
    setNotes(updatedNotes);
    toast.success("Note deleted!")
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  function editNote(id, newTitle, newContent, priority, attachment) {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map((note, index) => {
        if (index !== id) return note;
        return {
          title: newTitle,
          content: newContent,
          priority: priority,
          attachment: attachment
        };
      });
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  return (
    <div>
      <Header />
      <div
        style={{
          // width: "100%vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <input
          style={{
            height: "40px",
            width: "300px",
            borderRadius: "7px",
            border: "1px solid #C9C9C9",
            padding: "15px",
            boxShadow: "0 1px 5px rgb(138, 137, 137)"
          }}
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <CreateArea onAdd={addNote} />
      {notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase())).map((filteredNote, index) => (
        <Note
          key={index}
          id={index}
          title={filteredNote.title}
          content={filteredNote.content}
          attachment={filteredNote.attachment}
          priority={filteredNote.priority}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Footer />
    </div>
  );
}

export default App;
