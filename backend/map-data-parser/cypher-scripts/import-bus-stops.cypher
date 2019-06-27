WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' AND (EXISTS(e.tags.highway) AND e.tags.highway='bus_stop') OR EXISTS(e.tags.bus) AND e.tags.bus='yes'  THEN [e] ELSE [] END AS busstops
  UNWIND busstops as bs
	MATCH (p:Position) WHERE bs.id=p.id
	CREATE (bus:Bus_Stop {name: coalesce(bs.tags.name, "Unknown"), id: randomUUID()})
	MERGE (bus)-[r:LOCATES_ON]->(p)
