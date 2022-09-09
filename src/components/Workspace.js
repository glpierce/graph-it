import Canvas from "./Canvas.js"
import Controls from "./Controls.js"
import Node from "./Node.js"
import Edge from "./Edge.js"
import { useState } from "react"
import { calculateNewValue } from "@testing-library/user-event/dist/utils/index.js"

function Workspace() {
    const [nodes, setNodes] = useState([]) 
    const [edges, setEdges] = useState([])
    const [nodeCount, setNodeCount] = useState(0)
    const [edgeCount, setEdgeCount] = useState(0)
    
    function createNode() {
        const nodeData = {name: "", id: nodeCount, x: 150, y: 150}
        const temp = [...nodes]
        temp.push(nodeData)
        setNodes(temp)
        setNodeCount(nodeCount + 1)
    }

    function createEdge() {
        const edgeData = {id: edgeCount, weight: null, originNode: null, destinationNode: null}
        setEdges([...edges].push(edgeData))
        edgeCount++
    }

    function resetGraph() {
        setNodes([])
        setEdges([])
        setNodeCount(0)
        setEdgeCount(0)
    }

    return(
        <div className="workspace">
            <Controls createNode={createNode} createEdge={createEdge} resetGraph={resetGraph}/>
            <Canvas nodes={nodes} edges={edges}/>
        </div>
    )
}

export default Workspace