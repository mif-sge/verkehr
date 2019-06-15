WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='way' AND EXISTS(e.tags.amenity) AND  e.tags.amenity='hospital' THEN [e] ELSE [] END AS hospitals
  UNWIND hospitals as h
	MATCH (node:Nodes) WHERE node.id IN h.nodes
  MERGE (hospital:Hospital  {name: coalesce(h.tags.name, "Unknown")})
  MERGE (hospital)-[r:LOCATES_ON]->(node)