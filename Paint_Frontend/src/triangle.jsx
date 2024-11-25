function calculateTrianglePoints(center, head) {
    const { x: cx, y: cy } = center;
      const { x: tx, y: ty } = head;
    
      // Calculate radius (distance from center to head)
      const r = Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2);
    
      // Convert degrees to radians
      const angle120 = (120 * Math.PI) / 180;
      const angleNeg120 = (-120 * Math.PI) / 180;
    
      // Calculate second point (120 degrees)
      const x2 = cx + Math.cos(angle120) * (tx - cx) - Math.sin(angle120) * (ty - cy);
      const y2 = cy + Math.sin(angle120) * (tx - cx) + Math.cos(angle120) * (ty - cy);
    
      // Calculate third point (-120 degrees)
      const x3 = cx + Math.cos(angleNeg120) * (tx - cx) - Math.sin(angleNeg120) * (ty - cy);
      const y3 = cy + Math.sin(angleNeg120) * (tx - cx) + Math.cos(angleNeg120) * (ty - cy);
    
      // Return all three points
      return [
        { x: tx, y: ty },  // Top vertex
        { x: x2, y: y2 },  // Bottom-left vertex
        { x: x3, y: y3 }   // Bottom-right vertex
      ];
    }
    {triangles.map((triangle) => {
        return (
            <Polygon
            key = {triangle.id}
            id = {triangle.id}
            points={triangle.points} 
            stroke = {triangle.color}
            strokeWidth = {triangle.strokeWidth}
          />
        )
    })}