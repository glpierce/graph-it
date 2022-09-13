import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function PathData({ startID, endID, path, shortest }) {

    return(
        <div>
            <h3 className="shortestTitle">Shortest Path</h3>
            <div className="pathDataContainer">
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Origin:</p>
                    <p className="pathValue">Node {startID}</p>
                </div>
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Destination:</p>
                    <p className="pathValue">Node {endID}</p>
                </div>
            </div>
            <div className="pathDataContainer">
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Path:</p>
                    <p className='pathNode'>Node {startID}</p>
                    {path.map(nodeID =>
                        <div key={nodeID} className="pathStep">
                            <ArrowForwardIcon color="black" style={{marginLeft: 3, marginRight: 3}}/>
                            <p className='pathNode'>Node {nodeID}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="pathDataContainer">
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Edges:</p>
                    <p className="pathValue">{path.length}</p>
                </div>
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Weight Total:</p>
                    <p className="pathValue">{shortest[endID]}</p>
                </div>
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Average Weight:</p>
                    <p className="pathValue">{shortest[endID] / path.length}</p>
                </div>
            </div>
        </div>
    )
}

export default PathData