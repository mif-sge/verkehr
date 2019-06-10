import networkx as nx

def shortest_path(g, n1, n2):
    p = nx.dijkstra_path(g['graph'], n1, n2, 'distance')
    return [g['nodes'][w] for w in p]