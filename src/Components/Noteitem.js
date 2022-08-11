import noteContext from '../context/notes/noteContext';
import React, { useContext } from 'react'


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-4 my-2">
            <div className="card " >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.discription}</p>
                    <i className="fa-solid fa-trash-can mx-2 " onClick={() => {
                        deleteNote(note._id);
                        props.ShowAlert("Note Deleted successful", "success")
                    }}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={updateNote}></i>
                </div>
            </div>

        </div>
    )
}

export default Noteitem
