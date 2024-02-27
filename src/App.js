import './App.css';
import Sidebar from "./component/Sidebar";
import {useState, useEffect} from "react";
import Split from 'react-split';
import Editor from "./component/Editor";
import {nanoid} from "nanoid"
import {
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    deleteDoc,
    setDoc,
    orderBy,
    query,
    getDocs,
} from "firebase/firestore"
import {notesCollection, db} from "./firebase";

function App() {
    // const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
    const [notes, setNotes] = useState( []);
    const [currNote, setCurrNote] = useState("");
    const [tmpNoteText, setTmpNoteText] = useState( "");

    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, async (snapshot) => {
            const q =  query(notesCollection, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const noteArr = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id
                };
            })
            setNotes(noteArr);
            setCurrNote(noteArr[0] ? noteArr[0] : "");
            setTmpNoteText(noteArr[0] && noteArr[0].body ? noteArr[0].body : "")
        })
        return unsubscribe;
    }, [])


    useEffect(() => {
        if (currNote) {
            setTmpNoteText(currNote.body);
        }
    }, [currNote]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tmpNoteText !== currNote.body) {
                updateNote(tmpNoteText);
            }
        }, 1000)
        return () => clearTimeout(timeoutId);
    }, [tmpNoteText])

    async function createNewNote() {
        const newNote = {
            body: "New Note",
            createdAt: serverTimestamp()
        }
        const newNoteRef = await addDoc(notesCollection, newNote);
        // setNotes(prevState =>  [newNote, ...prevState])
        setCurrNote(newNote)
    }

    async function updateNote(text) {
        // get current Note from firebase
        if (!currNote) return;
        console.log(currNote);
        const docRef = doc(db, "notes", currNote.id);
        // set updated value back
        await setDoc(docRef, {body: text, createdAt: serverTimestamp()}, {merge: true})
        setCurrNote({body: text, id: currNote.id})
    }

    function findCurrentNote() {
        return currNote;
    }

    async function deleteNote(id) {
        // setNotes(oldNotes => {
        //     return oldNotes.filter(oldNote => {
        //         return oldNote.id !== id;
        //     })
        // })
        const docRef = doc(db, "notes", currNote.id);
        await deleteDoc(docRef);
        setCurrNote(old => notes[0]);
    }

  return (
    <div className="App">
        { notes.length > 0 ?
            (<Split sizes={[25, 75]}
                   minSize={100}
                   expandToMin={false}
                   gutterSize={10}
                   gutterAlign="center"
                   snapOffset={30}
                   dragInterval={1}
                   direction="horizontal"
                   cursor="col-resize"
                   className="split">
                <Sidebar createNewNote={createNewNote} notes={notes} currNote={currNote} setCurrNote={setCurrNote}
                         deleteNote={deleteNote}
                ></Sidebar>
                <Editor
                    tmpNoteText={tmpNoteText}
                    setTmpNoteText={setTmpNoteText}
                />
            </Split>) :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button
                    className="first-note"
                    onClick={createNewNote}
                >
                    Start Noting!
                </button>
            </div>

        }
    </div>
  );
}

export default App;
