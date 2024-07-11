import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { toast } from "react-toastify";
import "./BatteryLayout.scss";

const BatteryLayout = ({ batteries }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!batteries || batteries.length === 0) return;

    const width = 1000; // 100ft in pixels
    const height = 1000;
    const margin = 20;
    const maxWidth = 1000 - margin * 2; // 100ft width with margins

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");

    // Clear the previous layout
    svg.selectAll("*").remove();

    let currentX = margin;
    let currentY = margin;

    // Calculate total battery count
    const totalBatteryCount = batteries.reduce(
      (sum, battery) => sum + (battery.quantity || 0),
      0
    );

    // Calculate required transformers
    const transformerCount = Math.floor(totalBatteryCount / 4);

    // Add transformers to the list of items to layout
    const layoutItems = [
      ...batteries.filter((b) => b.quantity > 0),
      ...Array(transformerCount).fill({
        name: "Transformer",
        dimension: "10FT x 10FT",
        quantity: 1,
      }),
    ];

    let totalWidth = 0;

    layoutItems.forEach((item) => {
      const count = item.quantity || 0;
      if (count <= 0) return;

      const [itemWidth, itemHeight] = item.dimension
        .split("FT x ")
        .map((d) => parseInt(d, 10) * 10);

      for (let i = 0; i < count; i++) {
        if (currentX + itemWidth > maxWidth) {
          currentX = margin;
          currentY += itemHeight + margin;
        }

        if (currentY + itemHeight > height - margin) {
          console.error(
            "Layout exceeds available height. Please adjust your configuration."
          );
          return;
        }

        if (currentX + itemWidth > maxWidth) {
          toast.error(
            "Layout exceeds available width. Please adjust your configuration."
          );
          return;
        }

        svg
          .append("rect")
          .attr("x", currentX)
          .attr("y", currentY)
          .attr("width", itemWidth)
          .attr("height", itemHeight)
          .attr(
            "fill",
            item.name === "Transformer" ? "lightgreen" : "lightblue"
          )
          .attr("stroke", "black")
          .attr("stroke-width", 2);

        svg
          .append("image")
          .attr("x", currentX)
          .attr("y", currentY)
          .attr("width", itemWidth)
          .attr("height", itemHeight)
          .attr("xlink:href", item.image);

        svg
          .append("text")
          .attr("x", currentX + itemWidth / 2)
          .attr("y", currentY + itemHeight / 2)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .text(item.name)
          .style("font-size", "12px")
          .style("pointer-events", "none");

        currentX += itemWidth + margin;
        totalWidth = Math.max(totalWidth, currentX);
      }
    });

    // Display total layout size
    const totalHeight = currentY + margin;

    svg
      .append("text")
      .attr("x", width - margin)
      .attr("y", margin)
      .attr("text-anchor", "end")
      .attr("font-size", "12px")
      .text(`Total Layout Size: ${totalWidth / 10}FT x ${totalHeight / 10}FT`);
  }, [batteries]);

  return (
    <div className="mock-layout-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BatteryLayout;
