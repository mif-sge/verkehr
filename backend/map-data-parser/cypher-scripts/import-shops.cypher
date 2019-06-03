WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='node' AND EXISTS(e.tags.shop)  THEN [e] ELSE [] END AS shops
  UNWIND shops as shp
	MATCH (node:Nodes) WHERE node.id=shp.id
  MERGE (shop:Shops) ON CREATE
	SET shop.name= shp.name
  MERGE (shop)-[r:LOCATES_ON]->(node)
