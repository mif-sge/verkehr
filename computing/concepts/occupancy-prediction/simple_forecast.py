import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import KBinsDiscretizer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

from datetime import datetime

df = pd.read_csv('data/cta-ridership-l-station-entries-daily-totals.csv')

X = df[['station_id','date']]
X['date'] = X['date'].apply(lambda d: datetime.fromisoformat(d).timestamp())
X = X.values

# prep = KBinsDiscretizer(n_bins=[3, 2], encode='ordinal')
# X_prep = prep.fit(X)

y = df['rides'].values
y = pd.cut(y, 4, labels=False)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=10)

model = LogisticRegression()
model.fit(X_train, y_train)

print('LogisticRegression: ', model.score(X_test, y_test) * 100)

'''model = SVC(gamma='auto')
model.fit(X_train, y_train)

print('SVC: ', model.score(X_test, y_test) * 100)

from sklearn.neural_network import MLPClassifier

modelNN2 = MLPClassifier(random_state=1)

# Modell trainieren
print(modelNN2.fit(X_train, y_train))

# Modell testen
y_pred = modelNN2.predict(X_test)

# Güte des Modells ansehen
print("Güte des Modells (neuronales Netz 2):", modelNN2.score(X_test, y_test)*100)'''