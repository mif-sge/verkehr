WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' THEN [e] ELSE [] END AS nodes,
  CASE WHEN e.type='way' THEN [e] ELSE [] END AS ways

  FOREACH (n IN nodes |
  	MERGE (p:Position {id:n.id}) ON CREATE
  	SET p.latitude = n.lat, p.longitude = n.lon
  )
  FOREACH (w IN ways |
  	MERGE (s:Street {id:w.id}) ON CREATE
  	SET s.name= coalesce(w.tags.name, "Unknown"), s.maxspeed=coalesce(w.tags.maxspeed, "")
  )
  WITH e, ways
  UNWIND ways as w
  MATCH (s:Street), (p:Position) WHERE s.id=w.id AND p.id IN w.nodes
  MERGE (s)-[r:CONNECTS]->(p)
