import { useRef, useEffect } from "react"

function Canvas({ nodes, edges }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.setAttribute("width", "1000")
        canvas.setAttribute("height", "700")
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#000000'
        drawNodes(ctx)
        drawEdges()
    }, [nodes])

    function drawNodes(ctx) {
        nodes.forEach(node => {
            ctx.beginPath()
            ctx.arc(node.x, node.y, 50, 0, Math.PI * 2, false)
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.font = 'bold 14pt Calibri';
            ctx.textAlign = 'center';
            ctx.fillStyle = "white"
            ctx.fillText(`Node ${node.id}:`, node.x, node.y - 5)
            ctx.font = 'bold 14pt Calibri';
            ctx.textAlign = 'center';
            ctx.fillStyle = "white"
            ctx.fillText(node.name, node.x, node.y + 20)
            ctx.closePath()
        })
    }
    
    function drawEdges() {

    }

    return(<canvas ref={canvasRef}/>)
}

export default Canvas