WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' AND EXISTS(e.tags.highway) AND e.tags.highway='traffic_signals'  THEN [e] ELSE [] END AS traffic_signals
  UNWIND traffic_signals as ts
	MATCH (node:Nodes) WHERE node.id=ts.id
  MERGE (tsignal:Trafic_Signals  {name: coalesce(ts.tags.name, "Unknown")})
  MERGE (tsignal)-[r:LOCATES_ON]->(node)
