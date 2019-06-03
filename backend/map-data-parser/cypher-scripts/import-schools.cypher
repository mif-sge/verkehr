WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='way' AND EXISTS(e.tags.amenity) AND  e.tags.amenity='school' THEN [e] ELSE [] END AS schools
  UNWIND schools as scl
	MATCH (node:Nodes) WHERE node.id IN scl.nodes
  MERGE (school:Schools  {name: coalesce(scl.tags.name, "Unknown")})
  MERGE (school)-[r:LOCATES_ON]->(node)
return scl
