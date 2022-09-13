import { useEffect, useState } from "react"
import Draggable from "react-draggable"
import { useXarrow } from "react-xarrows"

function Node({ node, editObj, setEditObj, edgeToggle, createEdge, completeEdge, newEdge, dijToggle, startID, endID, selectStart, selectEnd, path}) {
    const [canvas, setCanvas] = useState(document.querySelector("div.canvas").getBoundingClientRect())
    const updateXarrow = useXarrow()

    useEffect(() => {
        setCanvas(document.querySelector("div.canvas").getBoundingClientRect())
    })
    
    function updateNode(e) {
        selectObj(e, {...node})
        updateXarrow()
    }
    
    function selectObj(e, obj) {
        if (edgeToggle) {
            if (Object.keys(newEdge).length) {
                completeEdge(obj.id)
            } else {
                createEdge(obj.id)
            }
        } else if (dijToggle) {
            if (startID == null) {
                selectStart(obj.id)
            } else {
                selectEnd(obj.id)
            }
        } else {
            setEditObj(obj)
        }
    }

    function selectColor() {
        if (((Object.keys(newEdge).length && newEdge.origin == node.id) || 
           (Object.keys(editObj).length && ((editObj.type == "node" && editObj.id == node.id) || editObj.origin == node.id))) ||
            node.id === startID) {
            return("5px solid green")
        } else if ((Object.keys(editObj).length && 
                  (editObj.type == "edge" && editObj.destination ==  node.id)) ||
                  node.id === endID) {
            return("5px solid red")
        } else if (!!path.length && path.includes(node.id)) {
            return("5px solid blue")
        } else {
            return("5px solid black")
        }
    }
    
    return(
        <Draggable bounds={{left: canvas.left, top: canvas.top - 164, right: canvas.right - 110, bottom: canvas.bottom - 274}} defaultPosition={{x: (canvas.width / 2) - 50, y: (canvas.height / 2) - 60}} onDrag={updateNode} onStop={updateXarrow}>
                <div key={node.id} id={`${node.id}`} className="node" style={{border: selectColor()}} onClick={e => selectObj(e, {...node})}>
                    <p className="nodeText" style={{marginBottom: 2}}>Node {node.id}</p>
                    {node.name != "" ? <p className="nodeText">{node.name}</p> : null}
                </div>
        </Draggable>
    )
}

export default Node