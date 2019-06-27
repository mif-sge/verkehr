WITH {json} as data
UNWIND data.elements as e
WITH e,
  CASE WHEN e.type='way' AND EXISTS(e.tags.amenity) AND  e.tags.amenity='school' THEN [e] ELSE [] END AS schools
  UNWIND schools as scl
  	MERGE (school:School {name: coalesce(scl.tags.name, "Unknown")})  ON CREATE
    SET school.id = randomUUID(),  school.SmartCityId="", school.occupancy="NONE"
	WITH scl, school
	MATCH (p:Position) WHERE p.id IN scl.nodes
  	MERGE (school)-[r:LOCATES_ON]->(p)
	WITH scl, school
	MATCH (s:Street) WHERE s.id = scl.id
	MERGE (school)-[r:LOCATES_ON]->(s)
