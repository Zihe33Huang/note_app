import React from "react"
import "../styles/Sidebar.css"

export default function Sidebar({createNewNote, notes, setCurrNote, currNote, deleteNote}) {

    const noteElements = notes.map((note, index) => {
        return (<div key={note.id} className={`sidebar--note  ${currNote.id === note.id ? "sidebar--note--chosen" : ""}`}
             onClick={() => {
            setCurrNote(note);

        }}>
            <h4 className="sidebar--note--h4">{note.body.split("\n")[0]}</h4>
            {<button  className="sidebar--note--btn" onClick={() => deleteNote(note.id)}>
                <i className="gg-trash"></i>
            </button> }
        </div>)
    })

    return (
        <section className="sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="sidebar--btn" onClick={createNewNote}>+</button>
            </div>
                {noteElements}
        </section>
    )
}
