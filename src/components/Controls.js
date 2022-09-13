import Button from '@mui/material/Button'

function Controls({numNodes, edges, setEdges, newEdge, edgeToggle, dijToggle, createNode, setEdgeToggle, setNewEdge, resetGraph, setEditObj, startDij, cancelDij }) {
    
    function handleEdge() {
        setEditObj({})
        if (edgeToggle) {
            if (!!Object.keys(newEdge).length) {
                setEdges(edges.filter(edge => edge.id != newEdge.id))
            }
            setNewEdge({})
            setEdgeToggle(false)
        } else {
            setEdgeToggle(true)
        }
        
    }

    function handleDij() {
        if (dijToggle) {
            cancelDij()
        } else {
            startDij()
        }
    }

    return(
        <div className="controls">
            <Button variant="outlined" disabled={dijToggle} onClick={e => createNode()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Create Node</Button>
            <Button variant="outlined" disabled={dijToggle || numNodes < 2} color={edgeToggle ? "error" : "primary"} onClick={e => handleEdge()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>{!edgeToggle ? "Create" : "Cancel"} Edge</Button>
            <Button variant="outlined" disabled={edgeToggle || (numNodes < 2 || Object.keys(edges).length < 1)} color={dijToggle ? "error" : "success"} onClick={handleDij}className="controlButton" style={{marginLeft: 5, marginRight: 5}}>{dijToggle ? "Cancel" : "Run"} Dijkstra</Button>
            <Button variant="outlined" color="error" onClick={e => resetGraph()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Reset Graph</Button>
        </div>
    )
}

export default Controls