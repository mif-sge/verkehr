WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' THEN [e] ELSE [] END AS nodes,
  CASE WHEN e.type='way' THEN [e] ELSE [] END AS ways

  FOREACH (n IN nodes |
  	MERGE (node:Nodes {id:n.id}) ON CREATE
  	SET node.latitude = n.lat, node.longitude = n.lon, node.type= n.type
  )
  FOREACH (w IN ways |
  	MERGE (way:Ways {id:w.id}) ON CREATE
  	SET way.type= w.type
  )
  WITH e, ways
  UNWIND ways as w
  MATCH (way:Ways), (node:Nodes) WHERE way.id=w.id AND node.id IN w.nodes
  MERGE (way)-[r:CONNECTS]->(node)
