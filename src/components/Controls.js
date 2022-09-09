import Button from '@mui/material/Button'

function Controls({ createNode, createEdge, resetGraph }) {
    return(
        <div className="controls">
            <Button variant="outlined" onClick={e => createNode()} className="controlButton">Create Node</Button>
            <Button variant="outlined" onClick={e => createEdge()} className="controlButton">Create Edge</Button>
            <Button variant="outlined" color="error" onClick={e => resetGraph()} className="controlButton">Reset Graph</Button>
        </div>
    )
}

export default Controls