import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { noteContext } from "../../Context/NoteContext";
import Loading from "../Loading/Loading";
import Note from "../Note/Note";
import { getUserNotes } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";

export default function Home() {
  const {notes,setNotes}=useContext(noteContext)
  const {token}=useContext(UserContext)
  useEffect(()=>{
    getUserNotes({token,updater:setNotes})
  },[])


  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>
      {notes == null ? (
  <Loading />
) : notes.length == 0 ? (
  <h2 className={`noNotes ${styles.noNotes}`}>
    <i className="bi bi-exclamation-triangle-fill"></i> No Notes Found
  </h2>
) : (
  <div className={styles.notes}>
    {notes.map((note) => (
      <Note noteObj={note} key={note._id} />
    ))}
  </div>
)}

    </>
  );
}
