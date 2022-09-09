import Draggable from "react-draggable"

function Node({ node }) {
    return(
        <Draggable>
                <div key={node.id} className="node" style={{left: node.x, top: node.y}}>
                    <p className="nodeText" style={{marginBottom: 2}}>Node {node.id}</p>
                    {node.name != "" ? <p className="nodeText">{node.name}</p> : null}
                </div>
        </Draggable>
    )
}

export default Node