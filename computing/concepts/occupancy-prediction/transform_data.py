def t(v):
    r = []
    for i in v:
        if i.isalpha():
            i = ord(i)
        r.append(str(i))
    return ''.join(r)

df = pd.read_csv('data/20140711.CSV', dtype={'TripID': int, 'RouteID': str, 'StopID': str, 'StopName': str, 'WeekBeginning': str, 'NumberOfBoardings': str})

df['RouteID'] = df['RouteID'].apply(t)

df.to_csv('data/t.csv')