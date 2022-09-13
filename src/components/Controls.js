import Button from '@mui/material/Button'

function Controls({numNodes, dijToggle, createNode, setEdgeToggle, resetGraph, setEditObj, startDij, cancelDij }) {
    function createEdge() {
        setEdgeToggle(true)
        setEditObj({})
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
            <Button variant="outlined" disabled={dijToggle} onClick={e => createEdge()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Create Edge</Button>
            <Button variant="outlined" disabled={!numNodes} color={dijToggle ? "error" : "success"} onClick={handleDij}className="controlButton" style={{marginLeft: 5, marginRight: 5}}>{dijToggle ? "Cancel" : "Run"} Dijkstra</Button>
            <Button variant="outlined" color="error" onClick={e => resetGraph()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Reset Graph</Button>
        </div>
    )
}

export default Controls