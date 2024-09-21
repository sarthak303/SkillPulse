import sys
import cv2
import numpy as np
import mediapipe as mp
from io import BytesIO

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Extract pose landmarks using MediaPipe
def extract_pose_landmarks(image):
    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    if results.pose_landmarks:
        landmarks = [[landmark.x, landmark.y, landmark.z] for landmark in results.pose_landmarks.landmark]
        return np.array(landmarks)
    return None

# Compare landmarks to predefined criteria for evaluating stance
def evaluate_stance(landmarks):
    if landmarks is None or len(landmarks) == 0:
        return "No Landmarks"
    
    shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
    elbow = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
    wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
    
    angle = np.arccos(np.dot(shoulder - elbow, wrist - elbow) / (np.linalg.norm(shoulder - elbow) * np.linalg.norm(wrist - elbow)))
    angle_degrees = np.degrees(angle)
    
    if 60 <= angle_degrees <= 160:  # Good stance range
        return f"Good Stance ({angle_degrees:.2f} degrees)"
    return f"Bad Stance ({angle_degrees:.2f} degrees)"

# Read the image from stdin
image_bytes = sys.stdin.read()
image = np.frombuffer(image_bytes, dtype=np.uint8)
image = cv2.imdecode(image, cv2.IMREAD_COLOR)

# Resize the image for consistency
image = cv2.resize(image, (640, 480))

# Process the image
landmarks = extract_pose_landmarks(image)
if landmarks is not None:
    result = evaluate_stance(landmarks)
    print(result)
else:
    print("No landmarks detected.")
