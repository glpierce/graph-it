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
    const [dijToggle, setDijToggle] = useState(false)
    const [startID, setStartID] = useState(null)
    const [endID, setEndID] = useState(null)
    const [dijResults, setDijResults] = useState({})
    const [path, setPath] = useState([])

    function createEdgeList(id) {
        const list = []
        edges.filter(edge => edge.origin == id || (edge.destination == id && edge.biDir !== null)).forEach(edge => {
            if (edge.origin == id) {
                list.push({destination: edge.destination, weight: edge.weight})
            } else {
                list.push({destination: edge.origin, weight: edge.biDir})
            }
        })
        return(list)
    }

    function populateData(start, parent, shortest, unvisited, adjacency) {
        nodes.forEach(node => {
            parent[node.id] = null
            shortest[node.id] = (node.id === start ? 0 : Infinity)
            unvisited.add(node.id)
            adjacency[node.id] = createEdgeList(node.id)
        })
    }

    function getClosest(unvisited, shortest) {
        let closestID = null
        let minValue = Infinity
        unvisited.forEach(nodeID => {
            if (shortest[nodeID] <= minValue) {
                minValue = shortest[nodeID]
                closestID = nodeID
            }
        })
        unvisited.forEach(nodeID => {
            if (nodeID === closestID) {
                unvisited.delete(nodeID)
            }
        })
        return(closestID)
    }

    function dijkstra(start) {
        const parent = {}
        const shortest = {}
        const unvisited = new Set()
        const adjacency = {}
        populateData(start, parent, shortest, unvisited, adjacency)
        const nodeCount = unvisited.size
        for (let i = 0; i < nodeCount; i++) {
            const closestID = getClosest(unvisited, shortest)
            adjacency[closestID].forEach(edge => {
                if (shortest[edge.destination] > shortest[closestID] + edge.weight) {
                    shortest[edge.destination] = shortest[closestID] + edge.weight
                    parent[edge.destination] = closestID
                }
            })
        }
        setDijResults({...parent})
    }

    function invalidPath() {

    }

    function generatePath(id, pathArray) {
        if (dijResults[id] === null) {
            if (startID !== id) {
                invalidPath()
            }
        } else {
            pathArray.unshift(id)
            generatePath(dijResults[id], pathArray)
        }
    }

    function startDij() {
        if (edgeToggle) {
            cancelEdge()
        }
        setEditObj({})
        setDijToggle(true)
    }

    function selectStart(id) {
        setStartID(id)
        dijkstra(id)
    }

    function selectEnd(id) {
        setEndID(id)
        const pathArray = []
        generatePath(id, pathArray)
        setPath([...pathArray])
    }
    
    function cancelDij() {
        setStartID(null)
        setEndID(null)
        setDijToggle(false)
        setDijResults({})
        setPath([])
    }

    function createNode() {
        const nodeData = {type: "node", id: nodeCount, name: ""}
        const temp = [...nodes]
        temp.push(nodeData)
        setNodes(temp)
        setNodeCount(nodeCount + 1)
        setEditObj(nodeData)
    }

    function createEdge(id) {
        const edgeData = {type: "edge", id: edgeCount, weight: 0, origin: id, destination: null, biDir: null}
        setNewEdge(edgeData)
        const temp = [...edges]
        temp.push(edgeData)
        setEdges(temp)
        setEdgeCount(edgeCount + 1)
    }

    function completeEdge(id) {
        if (id !== newEdge.origin) {
            const obj = {...newEdge, destination: id}
            const tempEdges = [...edges]
            tempEdges.splice(edges.findIndex(edge => edge.id == obj.id), 1, obj)
            setEdges(tempEdges)
            setEdgeToggle(false)
            setNewEdge({})
            setEditObj(obj)
        }
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
        if (edgeToggle) {
            cancelEdge()
        }
        if (dijToggle) {
            cancelDij()
        }
        setNodes([])
        setEdges([])
        setNodeCount(0)
        setEdgeCount(0)
        setEditObj({})
    }

    return(
        <div className="workspace">
            <Controls numNodes={nodes.length} 
                      edges={edges}
                      setEdges={setEdges}
                      newEdge={newEdge}
                      edgeToggle={edgeToggle}
                      dijToggle={dijToggle} 
                      createNode={createNode}
                      setEdgeToggle={setEdgeToggle}
                      setNewEdge={setNewEdge}
                      resetGraph={resetGraph}
                      setEditObj={setEditObj} 
                      startDij={startDij} 
                      cancelDij={cancelDij}/>
            <Canvas nodes={nodes} 
                    edges={edges} 
                    editObj={editObj} 
                    setEditObj={setEditObj} 
                    edgeToggle={edgeToggle} 
                    cancelEdge={cancelEdge} 
                    createEdge={createEdge} 
                    completeEdge={completeEdge} 
                    newEdge={newEdge} 
                    dijToggle={dijToggle} 
                    startID={startID} 
                    endID={endID} 
                    selectStart={selectStart} 
                    selectEnd={selectEnd} 
                    path={path}/>
            <Edit editObj={editObj} 
                  setEditObj={setEditObj} 
                  updateElement={updateElement} 
                  deleteElement={deleteElement}/>
        </div>
    )
}

export default Workspace