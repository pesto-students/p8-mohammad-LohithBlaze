import React, { useState, useEffect } from "react";
import Header from "./Component/Header";
import CreateNote from "./Component/CreateNotes";
import Note from "./Component/Note";
import Footer from "./Component/Footer";

const App = () => {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("notes") !== null ? JSON.parse(localStorage.getItem("notes")) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes((prevData) => {
      return [...prevData, note];
    });
  };

  const onDelete = (id) => {
    setNotes((olddata) =>
      olddata.filter((currdata, indx) => {
        return indx !== id;
      })
    );
  };

  return (
    <>
      <Header />
      <CreateNote passNote={addNote} />

      {notes.map((val, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={val.title}
            content={val.content}
            deleteItem={onDelete}
          />
        );
      })}

      <Footer />
    </>
  );
};

export default App;