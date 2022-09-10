import Canvas from "./Canvas.js"
import Controls from "./Controls.js"
import Edit from "./Edit.js"
import { useState } from "react"

function Workspace() {
    const [nodes, setNodes] = useState([]) 
    const [edges, setEdges] = useState([])
    const [nodeCount, setNodeCount] = useState(0)
    const [edgeCount, setEdgeCount] = useState(0)
    const [editObj, setEditObj] = useState({})
    const [edgeToggle, setEdgeToggle] = useState(false)
    const [newEdge, setNewEdge] = useState({})
    
    function createNode() {
        const nodeData = {type: "node", id: nodeCount, name: ""}
        const temp = [...nodes]
        temp.push(nodeData)
        setNodes(temp)
        setNodeCount(nodeCount + 1)
    }

    function createEdge(id) {
        const edgeData = {type: "edge", id: edgeCount, weight: 0, origin: id, destination: null}
        setNewEdge(edgeData)
        const temp = [...edges]
        temp.push(edgeData)
        setEdges(temp)
        setEdgeCount(edgeCount + 1)
    }

    function completeEdge(id) {
        const obj = {...newEdge, destination: id}
        const tempEdges = [...edges]
        tempEdges.splice(edges.findIndex(edge => edge.id == obj.id), 1, obj)
        setEdges(tempEdges)
        setEdgeToggle(false)
        setNewEdge({})
        setEditObj(obj)
    }

    function cancelEdge() {
        setEdges(edges.filter(edge => edge.id != newEdge.id))
        setEdgeToggle(false)
        setNewEdge({})
    }

    function updateElement(obj) {
        if (obj.type == "node") {
            const tempNodes = [...nodes]
            tempNodes.splice(nodes.findIndex(node => node.id == obj.id), 1, obj)
            setNodes(tempNodes)
            setEditObj({})
        } else {
            const tempEdges = [...edges]
            tempEdges.splice(edges.findIndex(edge => edge.id == obj.id), 1, obj)
            setEdges(tempEdges)
            setEditObj({})
        }
    }

    function deleteElement(e, obj) {
        if (obj.type == "node") {
            setEdges(edges.length ? edges.filter(edge => edge.origin != obj.id && edge.destination != obj.id) : {})
            setNodes(nodes.filter(node => node.id != obj.id))
            setEditObj({})
        } else {
            setEdges(edges.filter(edge => edge.id != obj.id))
            setEditObj({})
        }
    }

    function resetGraph() {
        setNodes([])
        setEdges([])
        setNodeCount(0)
        setEdgeCount(0)
        setEditObj({})
        if (edgeToggle) {
            cancelEdge()
        }
    }

    return(
        <div className="workspace">
            <Controls createNode={createNode} setEdgeToggle={setEdgeToggle} resetGraph={resetGraph} setEditObj={setEditObj}/>
            <Canvas nodes={nodes} edges={edges} editObj={editObj} setEditObj={setEditObj} edgeToggle={edgeToggle} cancelEdge={cancelEdge} createEdge={createEdge} completeEdge={completeEdge} newEdge={newEdge}/>
            <Edit editObj={editObj} setEditObj={setEditObj} updateElement={updateElement} deleteElement={deleteElement}/>
        </div>
    )
}

export default Workspace