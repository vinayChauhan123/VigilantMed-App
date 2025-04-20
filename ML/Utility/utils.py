import numpy as np

def fill_diagnosis(data):
    diagnosis_mapping = {
        "Alzheimer": "ChronicCond_Alzheimer",
        "HeartDisease": "ChronicCond_Heartfailure",
        "KidneyDisease": "ChronicCond_KidneyDisease",
        "Cancer": "ChronicCond_Cancer",
        "Obstructive PulmonaryDisease": "ChronicCond_ObstrPulmonary",
        "Depression": "ChronicCond_Depression",
        "Diabetes": "ChronicCond_Diabetes",
        "IschemicHeart": "ChronicCond_IschemicHeart",
        "Osteoporosis": "ChronicCond_Osteoporasis",
        "Other": "ChronicCond_rheumatoidarthritis", # Assuming 'Other' as rheumatoidarthritis
    }

    # Initialize all diagnosis as False (0)
    diagnosis_map = {key: 0 for key in diagnosis_mapping.values()}

    # Set True (1) for matching diagnoses
    for diag in data.get('diagnosis', []):
        for key, value in diag.items():
            mapped_key = diagnosis_mapping.get(key)
            if value and mapped_key:
                diagnosis_map[mapped_key] = 1
    
    return diagnosis_map


def prediction_score_generator(prediction):
    return np.random.beta(a=5, b=1.5)
