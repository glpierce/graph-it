import React, { useState } from "react"
import Canvas from "./Canvas.js"
import Controls from "./Controls.js"
import Dialogue from "./Dialogue.js"

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
    const [shortest, setShortest] = useState({})
    const [dijResults, setDijResults] = useState({})
    const [path, setPath] = useState([])
    const [pathInv, setPathInv] = useState(false)

    function assignWeight(weight, unit) {
        if (unit === "weight") {
            return weight
        } else if (unit === "edges") {
            return 1
        } else {
            return 0
        }
    }

    function createEdgeList(id, unit) {
        const list = []
        edges.filter(edge => edge.origin == id || (edge.destination == id && edge.biDir !== null)).forEach(edge => {
            if (edge.origin == id) {
                list.push({destination: edge.destination, weight: assignWeight(edge.weight, unit)})
            } else {
                list.push({destination: edge.origin, weight: assignWeight(edge.biDir, unit)})
            }
        })
        return(list)
    }

    function populateData(start, parent, shortestDist, unvisited, adjacency, unit) {
        nodes.forEach(node => {
            parent[node.id] = null
            shortestDist[node.id] = (node.id === start ? 0 : Infinity)
            unvisited.add(node.id)
            adjacency[node.id] = createEdgeList(node.id, unit)
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

    function dijkstra(start, unit) {
        const parent = {}
        const shortestDist = {}
        const unvisited = new Set()
        const adjacency = {}
        populateData(start, parent, shortestDist, unvisited, adjacency, unit)
        const nodeCount = unvisited.size
        for (let i = 0; i < nodeCount; i++) {
            const closestID = getClosest(unvisited, shortestDist)
            adjacency[closestID].forEach(edge => {
                if (shortestDist[edge.destination] > shortestDist[closestID] + edge.weight) {
                    shortestDist[edge.destination] = shortestDist[closestID] + edge.weight
                    parent[edge.destination] = closestID
                }
            })
        }
        setShortest({...shortestDist})
        setDijResults({...parent})
    }

    function generatePath(id, pathArray) {
        if (dijResults[id] !== null) {
            pathArray.unshift(id)
            generatePath(dijResults[id], pathArray)
            setPathInv(false)
        } else {
            if (startID !== id) {
                setPathInv(true)
            } else {
                setPathInv(false)
            }
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
        dijkstra(id, "weight")
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
        setShortest({})
        setPathInv(false)
    }

    function createNode() {
        cancelEdge()
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
        const duplicate = edges.find(edge => edge.destination === id && edge.origin === newEdge.origin)
        const inverse = edges.find(edge => edge.origin === id && edge.destination === newEdge.origin)
        if (duplicate === undefined) {
            if (inverse !== undefined) {
                if (inverse.biDir === null) {
                    const tempEdges = edges.filter(edge => edge.id !== newEdge.id)
                    inverse.biDir = 0
                    tempEdges.splice(tempEdges.findIndex(edge => edge.id === inverse.id), 1, inverse)
                    setEdges(tempEdges)
                    setEditObj(inverse)
                    setEdgeToggle(false)
                    setNewEdge({})
                }
            } else if (id !== newEdge.origin) {
                const tempEdges = [...edges]
                const obj = {...newEdge, destination: id}
                tempEdges.splice(tempEdges.findIndex(edge => edge.id == obj.id), 1, obj)
                setEdges(tempEdges)
                setEditObj(obj)
                setEdgeToggle(false)
                setNewEdge({})
            } 
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
            setEdges(edges.length ? edges.filter(edge => edge.origin != obj.id && edge.destination != obj.id) : [])
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
            <Dialogue editObj={editObj} 
                  setEditObj={setEditObj} 
                  updateElement={updateElement} 
                  deleteElement={deleteElement}
                  startID={startID}
                  endID={endID}
                  path={path}
                  shortest={shortest}
                  pathInv={pathInv}
                  dijkstra={dijkstra}
                  generatePath={generatePath}
                  setPath={setPath}/>
        </div>
    )
}

export default Workspace