from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

from os import path 

import pandas as pd
import datetime

if not path.exists('data/transformed_data.csv'):
    
    def t(v):
        r = []
        for i in v:
            if i.isalpha():
                i = ord(i)
            r.append(str(i))
        return ''.join(r)

    df = pd.read_csv('data/20140711.CSV', dtype={'TripID': int, 'RouteID': str, 'StopID': str, 'StopName': str, 'WeekBeginning': str, 'NumberOfBoardings': str})
    df['RouteID'] = df['RouteID'].apply(t)
    df.to_csv('data/transformed_data.csv')
    
df = pd.read_csv('data/transformed_data.CSV', dtype={'TripID': int, 'RouteID': str, 'StopID': int, 'StopName': str, 'WeekBeginning': str, 'NumberOfBoardings': int})

X = df[['RouteID', 'StopID', 'WeekBeginning']]
X['WeekBeginning'] = X['WeekBeginning'].apply(lambda d: datetime.datetime.strptime(d, "%Y-%m-%d %H:%M:%S").timestamp())
X = X.values

X_scaler = StandardScaler().fit_transform(X)

df['NumberOfBoardings'] = df['NumberOfBoardings'].apply(lambda v: float(v))
y = df['NumberOfBoardings'].values
y = pd.cut(y, 100, labels=False)

X_train, X_test, y_train, y_test = train_test_split(X_scaler, y, test_size=0.2, random_state=10)

model = LogisticRegression()
model.fit(X_train, y_train)

model.score(X_test, y_test) * 100