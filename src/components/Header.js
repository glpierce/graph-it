import React from "react";
import GraphItLogo from "../images/GraphItLogo.png"

function Header() {
    return(
        <div className="header">
            <img src={GraphItLogo} className="title" alt="Graph It"/>
            <p className="description">Create your own directed graph and use Dijkstra's algorithm to find the shortest path between nodes.</p>
        </div>
    )
}

export default Header