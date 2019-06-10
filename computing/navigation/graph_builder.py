import json
import networkx as nx

import transformer

def read_json_from_file(file):
    with open(file) as f:
        return json.load(f)
    
def from_osm(file):
    
    osm_data = read_json_from_file(file)
    
    (nodes, edges) = transformer.transform_data(osm_data)
    
    g = nx.Graph()
    
    for e in edges:
        g.add_edge(e["start"]["id"], e["end"]["id"], distance=e["distance"])
        g.add_edge(e["end"]["id"], e["start"]["id"], distance=e["distance"])
        
    return {
        'graph': g,
        'nodes': nodes,
        'edges': edges        
    }