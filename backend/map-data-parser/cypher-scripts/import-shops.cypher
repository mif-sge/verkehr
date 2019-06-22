WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' AND EXISTS(e.tags.shop)  THEN [e] ELSE [] END AS shops
  UNWIND shops as shp
	  MATCH (p:Position) WHERE p.id=shp.id
	  MERGE (shop:Shop {name: coalesce(shp.tags.name, "Unknown")})
	  MERGE (shop)-[r:LOCATES_ON]->(p)
