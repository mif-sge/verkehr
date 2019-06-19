import geopy.distance

def get_nodes(osm_data):
    return { n["id"] : n for n in [n for n in osm_data["elements"] if n["type"] == "node"] }
    
def get_edges(osm_data):
    
    edges = []
    
    for w in osm_data["elements"]:
        
        if w["type"] != "way":
            continue
        
        for i in range(1, len(w["nodes"])):
            edges.append({
                'start': w["nodes"][i - 1],
                'end': w["nodes"][i]
            })
            
     
    return edges
     
def get_distance_between_nodes(n1, n2):
    return geopy.distance.distance((n1["lat"], n1["lon"]), (n2["lat"], n2["lon"])).km

def transform_data(osm_data):
    
    nodes = get_nodes(osm_data)
    edges = get_edges(osm_data)
    dels = []
    
    for e in edges:
        if e["start"] not in nodes or e["end"] not in nodes:
            dels.append(e)
            continue
        e["start"] = nodes[e["start"]]
        e["end"] = nodes[e["end"]]
        e["distance"] = get_distance_between_nodes(e["start"], e["end"])
        
    for d in dels:
        edges.remove(d)
        
    return (nodes, edges)