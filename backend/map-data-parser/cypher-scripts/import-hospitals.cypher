WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='way' AND EXISTS(e.tags.amenity) AND  e.tags.amenity='hospital' THEN [e] ELSE [] END AS hospitals
  UNWIND hospitals as h
	MATCH (p:Position) WHERE p.id IN h.nodes
  MERGE (hospital:Hospital  {name: coalesce(h.tags.name, "Unknown")}) ON CREATE
  SET hospital.id = randomUUID()
  MERGE (hospital)-[r:LOCATES_ON]->(p)
