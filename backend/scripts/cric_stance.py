# %%
import mediapipe as mp
import cv2
import numpy as np
import os

# Initialize MediaPipe Pose solution
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Extract pose landmarks using MediaPipe
def extract_pose_landmarks(image):
    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    if results.pose_landmarks:
        # Get all landmarks in an array
        landmarks = [[landmark.x, landmark.y, landmark.z] for landmark in results.pose_landmarks.landmark]
        return np.array(landmarks)
    return None

# Compare landmarks to predefined criteria for evaluating stance
def evaluate_stance(landmarks):
    if landmarks is None or len(landmarks) == 0:
        return "No Landmarks", None
    
    shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
    elbow = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
    wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
    
    # Calculate the angle using vector math
    angle = np.arccos(np.dot(shoulder - elbow, wrist - elbow) /
                      (np.linalg.norm(shoulder - elbow) * np.linalg.norm(wrist - elbow)))
    angle_degrees = np.degrees(angle)
    
    # Define your stance criteria
    if 60 <= angle_degrees <= 160:  # Good stance range
        return "Good Stance", angle_degrees
    return "Bad Stance", angle_degrees

# Evaluate the image for stance
def evaluate_image_for_stance(image_path):
    if not os.path.exists(image_path):
        print(f"Error: The file '{image_path}' does not exist.")
        return

    image = cv2.imread(image_path)
    if image is None:
        print(f"Error: Unable to read the image file '{image_path}'. The file may be corrupt or in an unsupported format.")
        return

    try:
        image = cv2.resize(image, (640, 480))  # Resize image to 640x480 for consistency
    except cv2.error as e:
        print(f"Error resizing the image: {str(e)}")
        return

    landmarks = extract_pose_landmarks(image)
    if landmarks is not None:
        result, angle = evaluate_stance(landmarks)
        print(f"Result: {result}, Elbow Angle: {angle:.2f} degrees")
    else:
        print("Failed to detect landmarks in the image.")

# %%
image_path = "Cricket Batsman Stance/test/images/images--92-_jpg.rf.3bca276f640642e9e394ac22ab14c0d0.jpg"  # Replace with the actual image path
evaluate_image_for_stance(image_path)

# %%
import mediapipe as mp
import cv2
import numpy as np

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Extract pose landmarks using MediaPipe
def extract_pose_landmarks(frame):
    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if results.pose_landmarks:
        # Get all landmarks in an array
        landmarks = [[landmark.x, landmark.y, landmark.z] for landmark in results.pose_landmarks.landmark]
        return np.array(landmarks)
    return None

# Analyze frames and extract pose landmarks
def analyze_video_for_stance(video_path, num_frames=5, img_size=(640, 480)):
    frames = []
    cap = cv2.VideoCapture(video_path)
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = np.linspace(0, total_frames - 1, num_frames, dtype=int)

    for i in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if ret:
            frame = cv2.resize(frame, img_size)
            landmarks = extract_pose_landmarks(frame)
            if landmarks is not None:
                frames.append(landmarks)

    cap.release()
    return np.array(frames) if frames else None

# Compare landmarks to predefined criteria
def evaluate_stance(landmarks):
    if landmarks is None or len(landmarks) == 0:
        return "No Landmarks", None

    shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
    elbow = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
    wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]

    # Calculate the angle using vector math
    angle = np.arccos(np.dot(shoulder - elbow, wrist - elbow) /
                      (np.linalg.norm(shoulder - elbow) * np.linalg.norm(wrist - elbow)))
    angle_degrees = np.degrees(angle)

    # Define your stance criteria
    if 70 <= angle_degrees <= 110:  # Good stance range
        return "Good Stance", angle_degrees
    return "Bad Stance", angle_degrees

# Evaluate the video for stance
def evaluate_video_for_stance(video_path):
    landmarks = analyze_video_for_stance(video_path)
    if landmarks is not None:
        results = []
        for frame_landmarks in landmarks:
            result, angle = evaluate_stance(frame_landmarks)
            if result != "No Landmarks":
                results.append((result, angle))

        # Aggregating results
        stance_counts = {'Good Stance': 0, 'Bad Stance': 0}
        for result, _ in results:
            stance_counts[result] += 1

        # Determine the final result
        if stance_counts['Good Stance'] > stance_counts['Bad Stance']:
            print("Final Result: Good Stance")
        else:
            print("Final Result: Bad Stance")
    else:
        print("Failed to analyze stance.")


# %%
NUM_FRAMES = 30  # Number of frames to analyze
IMG_SIZE = (640, 480)  # Resize frames to this size


# %%
if __name__ == "__main__":
    video_path = "archive-2/Cover Drive/Cover Drive00012519.mov"  # Replace with your video path
    evaluate_video_for_stance(video_path)


