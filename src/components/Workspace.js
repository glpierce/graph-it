import Canvas from "./Canvas.js"
import Controls from "./Controls.js"
import Node from "./Node.js"
import Edge from "./Edge.js"
import { useState } from "react"

function Workspace() {
    const [nodes, setNodes] = useState([]) 
    const [edges, setEdges] = useState([])
    let nodeCount = 0
    let edgeCount = 0
    
    function createNode() {
        const nodeData = {name: "Test", id: nodeCount, x: 500, y: 500}
        const temp = [...nodes]
        temp.push(nodeData)
        setNodes(temp)
        nodeCount++
    }

    function createEdge() {
        const edgeData = {id: edgeCount, weight: null, originNode: null, destinationNode: null}
        setEdges([...edges].push(edgeData))
        edgeCount++
    }

    function resetGraph() {
        setNodes([])
        setEdges([])
        nodeCount = 0
        edgeCount = 0
    }

    return(
        <div>
            <Controls createNode={createNode} createEdge={createEdge} resetGraph={resetGraph}/>
            <Canvas nodes={nodes} edges={edges}/>
        </div>
    )
}

export default Workspace