import { useState, useEffect } from "react"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function PathData({ startID, endID, path, shortest, pathInv, dijkstra, generatePath, setPath }) {
    const units = ["weight", "edges"]
    const [unitToggle, setUnitToggle] = useState(units[0])

    useEffect(() => {
        dijkstra(startID, unitToggle)
    }, [unitToggle])

    useEffect(() => {
        const pathArray = []
        generatePath(endID, pathArray)
        setPath([...pathArray])
    }, [shortest])

    function cycleUnit(dir) {
        const index = units.indexOf(unitToggle)
        if (index + dir > units.length - 1) {
            setUnitToggle(units[0])
        } else if (index + dir < 0) {
            setUnitToggle(units[units.length - 1])
        } else {
            setUnitToggle(units[index + dir])
        }
    }

    function selectTitle() {
        if (pathInv) {
            return "Invalid Path"
        } else if (unitToggle === "edges") {
            return "Shortest Path (edges)"
        } else {
            return "Shortest Path (weight)"
        }
    }

    function edgesData() {
        return (
            <div className="pathDataContainer">
                <div className="pathDataContainer">
                    <p className="pathDataLabel">Edges:</p>
                    <p className="pathValue">{path.length}</p>
                </div>
            </div>
        )
    }

    function weightData() {
        return(
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
        )
    }

    function addPathData() {
        if (pathInv) {
            return(
                <div className="pathDataContainer">
                    <div className="pathDataContainer">
                        <p className="pathDataLabel">Path:</p>
                        <p className="pathNode">NONE</p>
                    </div>
                </div>
            )
        } else {
            return(
                <>
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
                    {unitToggle === "edges" ? edgesData() : weightData()}
                </>
            )
        }
    }
    
    return(
        <div>
            <div className="pathTitleContainer">
                {!pathInv ? <ChevronLeftIcon onClick={e => cycleUnit(-1)} color="black" style={{marginLeft: 3, marginRight: 3, cursor: "pointer"}}/> : null}
                <h3 className="shortestTitle">{selectTitle()}</h3>
                {!pathInv ? <ChevronRightIcon onClick={e => cycleUnit(1)} color="black" style={{marginLeft: 3, marginRight: 3, cursor: "pointer"}}/> : null}
            </div>
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
            {addPathData()}
        </div>
    )
    
}

export default PathData