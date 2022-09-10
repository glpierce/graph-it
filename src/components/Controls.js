import Button from '@mui/material/Button'

function Controls({ createNode, setEdgeToggle, resetGraph, setEditObj }) {
    function createEdge() {
        setEdgeToggle(true)
        setEditObj({})
    }

    return(
        <div className="controls">
            <Button variant="outlined" onClick={e => createNode()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Create Node</Button>
            <Button variant="outlined" onClick={e => createEdge()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Create Edge</Button>
            <Button variant="outlined" color="error" onClick={e => resetGraph()} className="controlButton" style={{marginLeft: 5, marginRight: 5}}>Reset Graph</Button>
        </div>
    )
}

export default Controls