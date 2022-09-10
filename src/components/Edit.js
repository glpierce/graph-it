import EditForm from "./EditForm.js";

function Edit({ editObj, setEditObj, updateElement, deleteElement}) {
    
    return(
        <div className="edit">
            {Object.keys(editObj).length ? <EditForm editObj={editObj} setEditObj={setEditObj} updateElement={updateElement} deleteElement={deleteElement}/> : null}
        </div>
    )
}

export default Edit