import math
import pandas as pd
import numpy as np

def get_model(file):
    
    nodes_df = pd.read_csv(file, sep=';')
    
    matrix = np.zeros((nodes_df.shape[0], nodes_df.shape[0]))
    
    for iindex, irow in nodes_df.iterrows():
        for jindex, jrow in nodes_df.iterrows():
            
            # TODO: Euclidean distance
            dist = math.sqrt(pow(irow["lat"] - jrow["lat"], 2) + pow(irow["lon"] - jrow["lon"], 2))
            matrix[iindex][jindex] = matrix[jindex][iindex] = dist
    
    return {
        'distances': matrix.tolist(),
        'max_distance': 3000,
        'vehicles': 2,
        'depot': 0
    }