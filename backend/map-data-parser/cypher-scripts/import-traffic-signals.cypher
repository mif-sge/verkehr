WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' AND EXISTS(e.tags.highway) AND e.tags.highway='traffic_signals'  THEN [e] ELSE [] END AS traffic_signals
  UNWIND traffic_signals as ts
	MATCH (p:Position) WHERE node.id=ts.id
  MERGE (tsignal:Traffic_Signal ) ON CREATE
  SET tsignal.id =  randomUUID()
  MERGE (tsignal)-[r:LOCATES_ON]->(p)
