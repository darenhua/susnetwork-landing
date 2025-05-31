"use client";

import * as d3 from "d3";
import data from "./data.json";
import { useEffect, useRef } from "react";

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    value: number;
}

export function NetworkGraph() {
    const containerRef = useRef<SVGSVGElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!initializedRef.current) {
            initializedRef.current = true;

            const svg = d3.select(containerRef.current);

            // Get the actual dimensions of the SVG
            const width = containerRef.current?.clientWidth || 800;
            const height = containerRef.current?.clientHeight || 600;

            // Set SVG dimensions
            svg.attr("width", width).attr("height", height);

            // Define node radius for boundary calculations
            const nodeRadius = 5;

            // Specify the color scale.
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            // The force simulation mutates links and nodes, so create a copy
            // so that re-evaluating this cell produces the same result.
            const links = data.links.map((d) => ({ ...d })) as Link[];
            const nodes = data.nodes.map((d) => ({ ...d })) as Node[];

            // Create a simulation with several forces.
            const simulation = d3
                .forceSimulation<Node>(nodes)
                .force(
                    "link",
                    d3.forceLink<Node, Link>(links).id((d) => d.id)
                )
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2 - 100, height / 2));

            // Add a line for each link, and a circle for each node.
            const link = svg
                .append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", (d) => Math.sqrt(d.value));

            const node = svg
                .append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", nodeRadius)
                .attr("fill", (d) => color(d.group.toString()));

            // Add a drag behavior.
            node.call(
                d3
                    .drag<SVGCircleElement, Node>()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

            // Set the position attributes of links and nodes each time the simulation ticks.
            simulation.on("tick", () => {
                // Constrain nodes to stay within bounds
                nodes.forEach((d) => {
                    d.x = Math.max(
                        nodeRadius,
                        Math.min(width - nodeRadius, d.x || 0)
                    );
                    d.y = Math.max(
                        nodeRadius,
                        Math.min(height - nodeRadius, d.y || 0)
                    );
                });

                link.attr("x1", (d) => (d.source as Node).x || 0)
                    .attr("y1", (d) => (d.source as Node).y || 0)
                    .attr("x2", (d) => (d.target as Node).x || 0)
                    .attr("y2", (d) => (d.target as Node).y || 0);

                node.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);
            });

            // Reheat the simulation when drag starts, and fix the subject position.
            function dragstarted(
                event: d3.D3DragEvent<SVGCircleElement, Node, Node>
            ) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            // Update the subject (dragged node) position during drag.
            function dragged(
                event: d3.D3DragEvent<SVGCircleElement, Node, Node>
            ) {
                // Constrain dragged position to bounds
                event.subject.fx = Math.max(
                    nodeRadius,
                    Math.min(width - nodeRadius, event.x)
                );
                event.subject.fy = Math.max(
                    nodeRadius,
                    Math.min(height - nodeRadius, event.y)
                );
            }

            // Restore the target alpha so the simulation cools after dragging ends.
            // Unfix the subject position now that it's no longer being dragged.
            function dragended(
                event: d3.D3DragEvent<SVGCircleElement, Node, Node>
            ) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
        }
    }, []);

    return (
        <>
            <svg className="w-full h-full" ref={containerRef}></svg>
        </>
    );
}
