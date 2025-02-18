import axios from "axios";
import Swal from "sweetalert2";



// *========> Add note
export function showDataModel({token,updater}){
    Swal.fire({
        title: "Add Note ",
        html:`
        <input type="text" placeholder="Enter a title" id="title" name="title" class="form-control"/>
        <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm:() => {
            const title=document.getElementById("title").value
            const content=document.getElementById("content").value
          return {title,content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        sendDataToApi({title:result.value.title,content:result.value.content,token,updater})
        
      });

}
async function sendDataToApi({title,content,token,updater}) {
    const {data}=await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,{title,content},{headers:{token}})
    if(data.msg==="done"){
        getUserNotes({token,updater})
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Note has been Added",
          showConfirmButton: false,
          timer: 1500
        });
    }
}
export async function getUserNotes({token,updater}){
    try {
      const {data}=await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{headers:{token}})
    updater(data.notes)
    } catch (error) {
      updater([])
    }
    
}


// *========> Delete note

export function showDeletedModel({noteId,token,updater}){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      deleteNote({noteId,token,updater})
    }
  });
}
async function deleteNote({noteId,token,updater}){
  const{data}=await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{headers:{token}})
  getUserNotes({token,updater})
  Swal.fire({
    title: "Deleted!",
    text: "Your Note has been deleted.",
    icon: "success"
  });
}


// *========> Update note
export function showUpdatedModel({prevTitle,PrevContent,noteId,token,updater}){
  Swal.fire({
    title: "Update Note ",
    html:`
    <input type="text" placeholder="Enter a title" id="title" name="title" class="form-control" value="${prevTitle}"/>
    <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3">${PrevContent}</textarea>
    `,
    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,
    preConfirm:() => {
        const title=document.getElementById("title").value
        const content=document.getElementById("content").value
      return {title,content}
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    updateNote({noteId,token,title:result.value.title,content:result.value.content,updater})
  });
}

async function updateNote({noteId,token,title,content,updater}){
  const {data}=await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{title,content},{headers:{token}})
  getUserNotes({token,updater})
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your Note has been Updated",
    showConfirmButton: false,
    timer: 1500
  });
}

