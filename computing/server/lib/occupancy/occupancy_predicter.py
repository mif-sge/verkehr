import joblib

def predict(routeId, stopId, timestamp):
    model = joblib.load('assets/logistic_regression.joblib')
    result = model.predict([[routeId, stopId, timestamp]])
    return result