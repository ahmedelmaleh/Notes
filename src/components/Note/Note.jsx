import { useContext } from "react";
import {  showDeletedModel, showUpdatedModel } from "../../utils/Note";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext";
import { noteContext } from "../../Context/NoteContext";

export default function Note({noteObj}) {
  const {token}=useContext(UserContext)
  const {setNotes}=useContext(noteContext)
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteObj.title}</h2>
          <p className={`mb-0 mt-2`}>{noteObj.content}</p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2" onClick={()=>{showUpdatedModel({prevTitle:noteObj.title,PrevContent:noteObj.content,noteId:noteObj._id,token,updater:setNotes})}}></i>

          <i className="bi bi-archive-fill pointer" onClick={()=>{showDeletedModel({noteId:noteObj._id,token,updater:setNotes})}}></i>
        </div>
      </div>
    </>
  );
}
