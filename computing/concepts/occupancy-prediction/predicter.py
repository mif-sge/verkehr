from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.externals import joblib

import pandas as pd
import datetime

'''
df = pd.read_csv('data/randomized_boardings.csv',sep=';')

X = df.drop("people", 1).drop("stop", 1).values
y = df["people"].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=10)

model = LinearRegression()
model.fit(X_train, y_train)

print(model.score(X_test, y_test))

y_pred = model.predict(X_test)

df = pd.DataFrame({'Actual': y_test.flatten(), 'Predicted': y_pred.flatten()})
print(df)
'''

df = pd.read_csv('data/t.CSV', dtype={'TripID': int, 'RouteID': str, 'StopID': int, 'StopName': str, 'WeekBeginning': str, 'NumberOfBoardings': int})

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

print(model.score(X_test, y_test) * 100)

# joblib.dump(model, 'model/logistic_regression_uncut.joblib')