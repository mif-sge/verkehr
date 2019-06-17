WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' AND (EXISTS(e.tags.highway) AND e.tags.highway='bus_stop') OR EXISTS(e.tags.bus) AND e.tags.bus='yes'  THEN [e] ELSE [] END AS busstops
  UNWIND busstops as bs
	MATCH (node:Nodes) WHERE bs.id=node.id
	MERGE (bus:Bus_Stops {name: coalesce(bs.tags.name, "Unknown")})
	MERGE (bus)-[r:LOCATES_ON]->(node)
