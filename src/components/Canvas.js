import Node from "./Node.js"
import Edge from "./Edge.js"

function Canvas({ nodes, edges }) {

    function drawNode(node) {
    
    }
    
    function drawEdges() {

    }

    return(
        <div className="canvas">
            {nodes.map(node => <Node key={node.id} node={node}/>)}
        </div>
    )
}

export default Canvas