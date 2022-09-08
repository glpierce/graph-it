import Button from '@mui/material/Button'

function Controls({ createNode, createEdge, resetGraph }) {
    return(
        <div>
            <Button variant="outlined" onClick={e => createNode()}>Create Node</Button>
            <Button variant="outlined" onClick={e => createEdge()}>Create Edge</Button>
            <Button variant="outlined" color="error" onClick={e => resetGraph()}>Reset Graph</Button>
        </div>
    )
}

export default Controls