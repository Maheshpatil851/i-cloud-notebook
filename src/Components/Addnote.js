import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setnote]=useState({title:"",discription:"",tag:""});

    const handleAddNote =(e)=>{
      try {
        e.preventDefault();
        addNote(note.title,note.discription,note.tag);
        props.ShowAlert("Note added successfully","success")
      } catch (error) {
        alert("fill the content properly")
        
      }
        
    }
    const onchange =(e)=>{
        setnote({...note,[e.target.name] : e.target.value})
        
    }
  return (
    <div>
         <div className='container my-3'>
        <h2>Add Note</h2>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onChange={onchange} name="title" placeholder='abc' />
          </div>

          <div className="col-12">
            <label htmlFor="discription" className="form-label">Discription</label>
            <textarea className="form-control" id="discription" name="discription" rows="3" onChange={onchange}></textarea>
          </div>
          <div className="col-md-6">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" onChange={onchange} name="tag"  id="tag" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
          </div>
        </form>
      </div>

      
    </div>
  )
}

export default Addnote
