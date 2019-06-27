WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='relation' AND (EXISTS(e.tags.route) AND e.tags.route='bus') THEN [e] ELSE [] END AS buslines
  UNWIND buslines as bl
  MERGE (busline:Bus_Line {id: bl.id})	ON CREATE
    SET busline.name = coalesce(bl.tags.name, "Unknown"), busline.from = coalesce(bl.tags.from, "Unknown"),
    busline.to = coalesce(bl.tags.to, "Unknown"), busline.number = coalesce(bl.tags.ref, "Unknown"),
    busline.note = coalesce(bl.tags.note, ""), busline.via = coalesce(bl.tags.via, "")
    WITH bl, busline, bl.members as members
    UNWIND members as m
    MATCH(p:Position) WHERE p.id=m.ref
    MERGE (busline)-[rn:VIA]->(p)
    WITH busline, members
    UNWIND members as m
    MATCH(s:Street) WHERE s.id=m.ref
    MERGE (busline)-[rn:VIA]->(s)
    WITH busline
    MATCH(busline)-[v:VIA]-(p:Position)-[l:LOCATES_ON]-(bs:Bus_Stop)
    MERGE (busline)-[h:SERVES]-(bs)
