import { useRef, useState } from "react"
import Node from "./Node.js"
import Xarrow, { Xwrapper } from "react-xarrows";

function Canvas({ nodes, edges, editObj, setEditObj, edgeToggle, cancelEdge, createEdge, completeEdge, newEdge }) {
    const cursor = useRef(null)
    const [cursorPos, setCursorPos] = useState([])
    
    function checkUnselect(e) {
        if (e.target.id == "canvas") {
            setEditObj({})
            if (edgeToggle) {
                cancelEdge()
            }
        }
    }

    function changeEdgeEnd(e) {
        if (edgeToggle) {
            setCursorPos([e.clientX, e.clientY])
        }
    }

    function selectEdge(e, obj) {
        setEditObj(obj)
    }

    function selectEdgeColor(edge) {
        if ((Object.keys(editObj).length && (editObj.type == "edge" && editObj.id == edge.id)) ||
            (Object.keys(newEdge).length && newEdge.id == edge.id)) {
            return("CornflowerBlue")
        } else {
            return("black")
        }
    }

    return(
        <div id={"canvas"} className="canvas" onClick={e => checkUnselect(e)} onMouseMove={e => changeEdgeEnd(e)}>
            {edgeToggle ? <div ref={cursor} style={{height: 0, width: 0, position: "absolute", top: cursorPos[1], left: cursorPos[0]}}/> : null}
            <Xwrapper>
                {nodes.map(node => <Node key={node.id} node={node} editObj={editObj} setEditObj={setEditObj} edgeToggle={edgeToggle} createEdge={createEdge} completeEdge={completeEdge} newEdge={newEdge}/>)}
                {edges.map(edge => <Xarrow key={edge.id} start={`${edge.origin}`} end={edge.destination != null ? `${edge.destination}` : cursor} color={selectEdgeColor(edge)} passProps={{onClick: (e) => selectEdge(e, {...edge})}} style={{cursor: "grab"}}/>)}
            </Xwrapper>
        </div>
    )
}

export default Canvas