import graph_builder
import path_evaluator

g = graph_builder.from_osm('../../data/openstreetmap-data-osm.json')
p = path_evaluator.shortest_path(g, 253763281, 417853043)

print(p)