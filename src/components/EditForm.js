import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

function EditForm({ editObj, setEditObj, updateElement, deleteElement }) {
    const [value, setValue] = useState(editObj.type === "edge" ? `${editObj.weight}` : editObj.name)
    const [biDir, setBiDir] = useState(editObj.type === "edge" && editObj.biDir !== null ? `${editObj.biDir}` : null)

    useEffect(() => {
        setValue(editObj.type == "edge" ? editObj.weight : editObj.name)
        setBiDir(editObj.type == "edge" && editObj.biDir !== null ? editObj.biDir : null)
    },[editObj])

    function updateValue(e) {
        if (editObj.type == "node") {
            setValue(e.target.value)
        } else {
            if (e.target.value === "") {
                setValue("")
            } else if (/^[0-9]*?\.?[0-9]*$/.test(e.target.value)) {
                setValue(e.target.value)
            }
        }
    }

    function updateBiDir(e) {
        if (e.target.value === "") {
            setBiDir("")
        } else if (/^[0-9]*?\.?[0-9]*$/.test(e.target.value)) {
                setBiDir(e.target.value)
        }
    }

    function toggleBiDir(e) {
        if (e.target.checked) {
            if (editObj.biDir !== null) {
                setBiDir(editObj.biDir)
            } else {
                setBiDir(0)
            }
        } else {
            setBiDir(null)
        }
    }

    function saveChange(e, obj) {
        if (obj.type == "edge") {
            if (value === "") {
                obj.weight = 0
            } else if (/^[0-9]*?\.?[0-9]*$/.test(value)) {
                obj.weight = parseFloat(value)
            } 
            if (biDir !== null) {
                if (biDir == "") {
                    obj.biDir = 0
                } else if (/^[0-9]*?\.?[0-9]*$/.test(biDir)) {
                    obj.biDir = parseFloat(biDir)
                }
            } else {
                obj.biDir = null
            }
        } else {
            obj.name = value
        }
        updateElement(obj)
    }

    return(
        <div>
            <h3>{editObj.type == "edge" ? "Edge" : "Node"} {editObj.id}</h3>
            <div className='editForm'>
                {editObj.type == "edge" ? 
                    <FormControlLabel label="Bi-Directional" 
                                      control={<Checkbox checked={biDir === null ? false : true} 
                                                         onChange={e => toggleBiDir(e)} 
                                                         inputProps={{ 'aria-label': 'controlled' }}/>
                                      }/> 
                    : null
                }
                <TextField label={editObj.type == "edge" ? `${editObj.origin} --> ${editObj.destination} Weight` : "Name"} 
                           variant="outlined" 
                           size="small" 
                           value={value} 
                           onChange={e => updateValue(e)} 
                           style={{marginRight: 4}}
                />
                {biDir !== null ? 
                    <TextField label={`${editObj.destination} --> ${editObj.origin} Weight`} 
                               variant="outlined" 
                               size="small" 
                               value={biDir} 
                               onChange={e => updateBiDir(e)} style={{marginRight: 4}}/> 
                    : null
                }
                <Button variant="outlined" 
                        color="success" 
                        onClick={e => saveChange(e, {...editObj})} 
                        className="controlButton" 
                        style={{marginLeft: 4, marginRight: 15}}>
                        Update
                </Button>
                <Button variant="outlined" 
                        color="error" 
                        onClick={e => deleteElement(e, {...editObj})} 
                        className="controlButton" 
                        style={{marginLeft: 5}}>
                        Delete {editObj.type == "edge" ? "Edge" : "Node"}
                </Button>
            </div>
        </div>
    )
}

export default EditForm