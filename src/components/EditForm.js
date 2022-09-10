import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function EditForm({ editObj, setEditObj, updateElement, deleteElement }) {
    const [value, setValue] = useState(editObj.type == "edge" ? editObj.weight : editObj.name)

    useEffect(() => {
        setValue(editObj.type == "edge" ? editObj.weight : editObj.name)
    },[editObj])

    function updateValue(e) {
        setValue(e.target.value)
    }

    function saveChange(e, obj) {
        if (obj.type == "edge") {
            obj.weight = value
        } else {
            obj.name = value
        }
        updateElement(obj)
    }

    return(
        <div>
            <h3>{editObj.type == "edge" ? "Edge" : "Node"} {editObj.id}</h3>
            <div className='editForm'>
                <TextField label={editObj.type == "edge" ? "Weight" : "Name"} variant="outlined" size="small" value={value} onChange={e => updateValue(e)} style={{marginRight: 4}}/>
                <Button variant="outlined" color="success" onClick={e => saveChange(e, {...editObj})} className="controlButton" style={{marginLeft: 4, marginRight: 15}}>Update</Button>
                <Button variant="outlined" color="error" onClick={e => deleteElement(e, {...editObj})} className="controlButton" style={{marginLeft: 5}}>Delete {editObj.type == "edge" ? "Edge" : "Node"}</Button>
            </div>
        </div>
    )
}

export default EditForm