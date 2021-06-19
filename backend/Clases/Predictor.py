from sklearn.ensemble import RandomForestRegressor
import pickle

class Predictor:

    def get_summer(self, n):
        if n in [5,6,7,8]:
            return 1
        else:
            return 0
    
    def get_evening(self, h):
        if h in [2,3,4,5,6]:
            return 1
        else:
            return 0
        
    def get_night(self, h):
        if h in [21,22,23,0,1]:
            return 1
        else:
            return 0

    def get_afternoon(self, h):
        if h in [11,12,13,15,16]:
            return 1
        else:
            return 0

    def transformar(self, X):
        XN = [[
            self.get_night(int(X['Hour'])),
            self.get_evening(int(X['Hour'])),
            self.get_afternoon(int(X['Hour'])),
            self.get_summer(int(X['Month'])),
            float(X['T']),
            float(X['RH']),
            float(X['CO'])
        ]]

        return XN

    def predecir(self, X):
        modelo = pickle.load(open('./Clases/gbt_regresor.pkl', 'rb'))
        XN = self.transformar(X)

        return modelo.predict(XN)