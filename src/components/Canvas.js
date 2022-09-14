import { useRef, useState } from "react"
import Node from "./Node.js"
import Xarrow, { Xwrapper } from "react-xarrows";

function Canvas({ nodes, edges, editObj, setEditObj, edgeToggle, cancelEdge, createEdge, completeEdge, newEdge, dijToggle, startID, endID, selectStart, selectEnd, path }) {
    const cursor = useRef(null)
    const [cursorPos, setCursorPos] = useState([])

    function checkUnselect(e) {
        if (["canvas", "instructions", "mode"].includes(e.target.id)) {
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
        } else if (!!path.length && (((path.indexOf(edge.origin) !== -1 && path.indexOf(edge.origin) + 1 === path.indexOf(edge.destination)) || (path.indexOf(edge.destination) !== -1 && path.indexOf(edge.destination) + 1 === path.indexOf(edge.origin))) || (startID === edge.origin && path[0] === edge.destination))) {
            return("Blue")
        } else {
            return("black")
        }
    }

    function setEdgeTop(edge) {
        if (Object.keys(editObj).length && (editObj.type == "edge" && edge.id == editObj.id)) {
            return 4
        } else if (!!path.length && ((path.indexOf(edge.origin) !== -1 && path.indexOf(edge.origin) + 1 === path.indexOf(edge.destination)) || (startID === edge.origin && path[0] === edge.destination))) {
            return 2
        } else {
            return 1
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

    function selectInstructions() {
        if (edgeToggle) {
            if (!Object.keys(newEdge).length) {
                return(<p className="instructionsLabel">Select a start node for the edge.</p>)
            } else {
                return(<p className="instructionsLabel">Select an end node for the edge.</p>)
            }
        } else if (dijToggle) {
            if (startID === null) {
                return(<p className="instructionsLabel">Select a start node.</p>)
            } else {
                return(<p className="instructionsLabel">Select an end node to see the shortest path.</p>)
            }
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
            <div id={"mode"} className="modeContainer">
                {selectMode()}
            </div>
            <div id={"instructions"} className="instructionsContainer">
                {selectInstructions()}
            </div>
        </div>
    )
}

export default Canvas