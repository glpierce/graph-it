import { useRef, useState } from "react"
import Node from "./Node.js"
import Xarrow, { Xwrapper } from "react-xarrows";

function Canvas({ nodes, edges, editObj, setEditObj, edgeToggle, cancelEdge, createEdge, completeEdge, newEdge, dijToggle, startID, endID, selectStart, selectEnd, path }) {
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
        } else if (!!path.length && ((path.indexOf(edge.origin) !== -1 && path.indexOf(edge.origin) + 1 === path.indexOf(edge.destination)) || (startID === edge.origin && path[0] === edge.destination))) {
            return("Blue")
        } else {
            return("black")
        }
    }

    function setEdgeTop(edge) {
        if (Object.keys(editObj).length && (editObj.type == "edge" && edge.id == editObj.id)) {
            return 1
        } else if (!!path.length && ((path.indexOf(edge.origin) !== -1 && path.indexOf(edge.origin) + 1 === path.indexOf(edge.destination)) || (startID === edge.origin && path[0] === edge.destination))) {
            return 1
        } else {
            return 0
        }
    }

    function labelEdge(edge) {
        if (edge.destination !== null) {
            return(
                <>
                    <p className="edgeLabel" onClick={(e) => selectEdge(e, {...edge})} style={{cursor: "grab"}}>{edge.weight}</p>
                    {edge.biDir !== null ? <p className="edgeLabel" onClick={(e) => selectEdge(e, {...edge})} style={{cursor: "grab"}}>{edge.biDir}</p> : null}
                </>
            )
        } else {
            return("")
        }
    }

    function selectMode() {
        if (edgeToggle) {
            return(<h3 className="modeLabel">Edge Mode</h3>)
        } else if (Object.keys(editObj).length) {
            return(<h3 className="modeLabel">Edit Mode</h3>)
        } else if (dijToggle) {
            return <h3 className="modeLabel">Dijkstra Mode</h3>
        }
    }

    return(
        <div id={"canvas"} className="canvas" onClick={e => checkUnselect(e)} onMouseMove={e => changeEdgeEnd(e)}>
            {edgeToggle ? <div ref={cursor} style={{height: 0, width: 0, position: "absolute", top: cursorPos[1], left: cursorPos[0]}}/> : null}
            <Xwrapper>
                {nodes.map(node => 
                    <Node key={node.id}
                          node={node} 
                          editObj={editObj} 
                          setEditObj={setEditObj} 
                          edgeToggle={edgeToggle} 
                          createEdge={createEdge} 
                          completeEdge={completeEdge} 
                          newEdge={newEdge}
                          dijToggle={dijToggle}
                          startID={startID}
                          endID={endID}
                          selectStart={selectStart}
                          selectEnd={selectEnd}
                          path={path}/>
                )}
                {edges.map(edge => 
                    <Xarrow key={edge.id} 
                            start={`${edge.origin}`} 
                            end={edge.destination != null ? `${edge.destination}` : cursor}
                            zIndex={setEdgeTop(edge)}
                            passProps={{onClick: (e) => selectEdge(e, {...edge})}}
                            labels={labelEdge(edge)} 
                            curveness={0.2}
                            showTail={edge.biDir === null ? false : true}
                            color={selectEdgeColor(edge)} 
                            style={{cursor: "grab"}}/>
                )}
            </Xwrapper>
            <div className="modeContainer">
                {selectMode()}
            </div>
        </div>
    )
}

export default Canvas