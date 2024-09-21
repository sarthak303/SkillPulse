import sys
import json
import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import GradientBoostingClassifier

# Load the pre-trained logistic regression model
model_path = 'logistic_model.pkl'
logistic_model = joblib.load(model_path)

# Initialize and train the Gradient Boosting Classifier (if necessary)
gb = GradientBoostingClassifier()
gb.fit(np.random.rand(1000, 10), np.random.randint(2, size=1000))

def predict_shot(input_data):
    df = pd.DataFrame([input_data])
    df['location'] = np.where(df['location'] == 'H', 1, 0)
    df['w'] = np.where(df['w'] == 'W', 1, 0)

    # Use logistic regression model for prediction
    # prediction = logistic_model.predict(df)
    # probability = logistic_model.predict_proba(df)[:, 1]

    # Use Gradient Boosting model for prediction
    gb_prediction = gb.predict(df)
    gb_probability = gb.predict_proba(df)[:, 1]

    return {
        'gb_prediction': 'made' if gb_prediction[0] == 1 else 'missed',
        'gb_probability': float(gb_probability[0])
    }

def main():
    # Directly read input data from data.json
    try:
        with open('data.json', 'r') as f:
            input_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # Validate required keys in input data
    required_keys = ['shot_clock', 'shot_dist', 'close_def_dist', 'period', 'touch_time', 'dribbles', 'shot_number', 'pts_type', 'location', 'w']
    if not all(key in input_data for key in required_keys):
        print(f"Input data is missing one of the required keys: {required_keys}")
        return

    # Call the prediction function
    prediction_result = predict_shot(input_data)

    # Print the prediction result as JSON
    print(json.dumps(prediction_result))

if __name__ == "__main__":
    main()
