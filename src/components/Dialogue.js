import EditForm from "./EditForm.js";
import PathData from "./PathData.js"

function Dialogue({ editObj, setEditObj, updateElement, deleteElement, startID, endID, path, shortest}) {
    
    function selectDialogue() {
        if (Object.keys(editObj).length) {
            return(<EditForm editObj={editObj} setEditObj={setEditObj} updateElement={updateElement} deleteElement={deleteElement}/>)
        } else if (!!path.length) {
            return(<PathData startID={startID} endID={endID} path={path} shortest={shortest}/>)
        }
    }

    return(
        <div className="edit">
            {selectDialogue()}
        </div>
    )
}

export default Dialogue