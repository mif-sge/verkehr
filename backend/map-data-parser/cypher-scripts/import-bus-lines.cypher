WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='relation' AND (EXISTS(e.tags.route) AND e.tags.route='bus') THEN [e] ELSE [] END AS buslines
  UNWIND buslines as bl
  MERGE (busline:Bus_Line {id: bl.id})	ON CREATE
    SET busline.name = coalesce(bl.tags.name, "Unknown"), busline.from = coalesce(bl.tags.from, "Unknown"),
    busline.to = coalesce(bl.tags.to, "Unknown"), busline.ref = coalesce(bl.tags.ref, "Unknown"),
    busline.note = coalesce(bl.tags.note, ""), busline.via = coalesce(bl.tags.via, "")
    WITH bl, busline, bl.members as members
    UNWIND members as m
    MATCH(n:Nodes) WHERE n.id=m.ref
    MERGE (busline)-[rn:VIA]->(n)
    WITH busline, members
    UNWIND members as m
    MATCH(w:Ways) WHERE w.id=m.ref
    MERGE (busline)-[rn:VIA]->(w)
    WITH busline
    match (busline)-[v:VIA]-(n:Nodes)-[l:LOCATES_ON]-(bs:Bus_Stops)
    MERGE (busline)-[so:STOPS_ON]->(bs)
