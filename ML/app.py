from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from flask_cors import CORS
from Utility.utils import fill_diagnosis
from Utility.utils import prediction_score_generator
from sklearn.preprocessing import LabelEncoder

def encode_categorical(value, encoder):
    if value is None:
        return 0
    try:
        return float(value)  # Convert numbers directly
    except ValueError:
        return encoder.transform([value])[0] if value in encoder.classes_ else 0

encoders = {
    'BeneID': LabelEncoder(),
    'ClaimID': LabelEncoder(),
    'Provider': LabelEncoder(),
    'AttendingPhysician': LabelEncoder()
}



model = tf.keras.models.load_model('./MlModel.h5')
app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('./MlModel.h5')
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print('Endpoint hit, executing Python code')

        data = request.json['data']

        data_diagonsis=fill_diagnosis(data)
        print('data_diagonosis',data_diagonsis)
         
        data_map = {
                    "BeneID": data['user'],
                    "ClaimID": data['_id'],
                    "ClaimStartDt": None,
                    "ClaimEndDt": None,
                    "Provider": data['insuranceProvider'],
                    "InscClaimAmtReimbursed": data['totalBill']/86,
                    "AttendingPhysician": data['physician'],
                    "OperatingPhysician": None,
                    "OtherPhysician": None,
                    "ClmDiagnosisCode_1": None,
                    "ClmDiagnosisCode_2": None,
                    "ClmDiagnosisCode_3": None,
                    "ClmDiagnosisCode_4": None,
                    "ClmDiagnosisCode_5": None,
                    "ClmDiagnosisCode_6": None,
                    "ClmDiagnosisCode_7": None,
                    "ClmDiagnosisCode_8": None,
                    "ClmDiagnosisCode_9": None,
                    "ClmDiagnosisCode_10": None,
                    "ClmProcedureCode_1": None,
                    "ClmProcedureCode_2": None,
                    "ClmProcedureCode_3": None,
                    "ClmProcedureCode_4": None,
                    "ClmProcedureCode_5": None,
                    "ClmProcedureCode_6": None,
                    "DeductibleAmtPaid": None,
                    "ClmAdmitDiagnosisCode": None,
                    "AdmissionDt": None,
                    "DischargeDt": None,
                    "DiagnosisGroupCode": None,
                    "DOB": None,
                    "DOD": None,
                    "Gender": None,
                    "Race": None,
                    "RenalDiseaseIndicator": None,
                    "State": None,
                    "County": 0,
                    "NoOfMonths_PartACov": 0,
                    "NoOfMonths_PartBCov": 0,
                    "ChronicCond_Alzheimer": data_diagonsis['ChronicCond_Alzheimer'],
                    "ChronicCond_Heartfailure": data_diagonsis['ChronicCond_Heartfailure'],
                    "ChronicCond_KidneyDisease": data_diagonsis['ChronicCond_KidneyDisease'],
                    "ChronicCond_Cancer": data_diagonsis['ChronicCond_Cancer'],
                    "ChronicCond_ObstrPulmonary": data_diagonsis['ChronicCond_ObstrPulmonary'],
                    "ChronicCond_Depression": data_diagonsis['ChronicCond_Depression'],
                    "ChronicCond_Diabetes": data_diagonsis['ChronicCond_Diabetes'],
                    "ChronicCond_IschemicHeart": data_diagonsis['ChronicCond_IschemicHeart'],
                    "ChronicCond_Osteoporasis": data_diagonsis['ChronicCond_Osteoporasis'],
                    "ChronicCond_rheumatoidarthritis": data_diagonsis['ChronicCond_rheumatoidarthritis'],
                    "ChronicCond_stroke": 0,
                    "IPAnnualReimbursementAmt": 5000,
                    "IPAnnualDeductibleAmt": 0,
                    "OPAnnualReimbursementAmt": 1000,
                    "OPAnnualDeductibleAmt": 0
                }

        for field, encoder in encoders.items():
            encoder.fit([data.get(field, "Unknown")])

        data_values = list(data_map.values())
        data_values = [
    encode_categorical(value, encoders.get(key)) if key in encoders else float(value) if isinstance(value, (int, float)) else 0
    for key, value in data_map.items()
            ]
        data_values = np.array(data_values, dtype=np.float32).reshape(1, -1)

        # Predict using the model
        predictions = model.predict(data_values)
        predictions_rounded = np.round(predictions)

        prediction_value=prediction_score_generator(predictions)
        print("hahaha",prediction_value)
     

        return jsonify({'prediction': prediction_value})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000)

