import React, { useState } from 'react';

const Basketball = () => {
    const [shotClock, setShotClock] = useState('');
    const [shotDist, setShotDist] = useState('');
    const [closeDefDist, setCloseDefDist] = useState('');
    const [period, setPeriod] = useState('');
    const [touchTime, setTouchTime] = useState('');
    const [dribbles, setDribbles] = useState('');
    const [shotNumber, setShotNumber] = useState('');
    const [ptsType, setPtsType] = useState('');
    const [location, setLocation] = useState('H'); // Default to Home
    const [winning, setWinning] = useState('W'); // Default to Winning
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // For error handling

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state
        
        const shotData = {
            shot_clock: parseFloat(shotClock),
            shot_dist: parseFloat(shotDist),
            close_def_dist: parseFloat(closeDefDist),
            period: parseInt(period),
            touch_time: parseFloat(touchTime),
            dribbles: parseInt(dribbles),
            shot_number: parseInt(shotNumber),
            pts_type: parseInt(ptsType),
            location: location,
            w: winning
        };

        try {
            // Write shot data to data.json before sending
            await fetch('http://localhost:4000/api/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shotData),
            });

            // Send the shot data for prediction
            const response = await fetch('http://localhost:4000/api/predict-shot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shotData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            setResult(data);
        } catch (error) {
            console.error('Error predicting shot:', error);
            setError(error.message); // Set error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Basketball Shot Predictor</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" value={shotClock} onChange={(e) => setShotClock(e.target.value)} placeholder="Shot Clock (0-24)" required />
                <input type="number" value={shotDist} onChange={(e) => setShotDist(e.target.value)} placeholder="Shot Distance (feet)" required />
                <input type="number" value={closeDefDist} onChange={(e) => setCloseDefDist(e.target.value)} placeholder="Closest Defender Distance (feet)" required />
                <input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Period (1-4)" required />
                <input type="number" value={touchTime} onChange={(e) => setTouchTime(e.target.value)} placeholder="Touch Time (seconds)" required />
                <input type="number" value={dribbles} onChange={(e) => setDribbles(e.target.value)} placeholder="Number of Dribbles" required />
                <input type="number" value={shotNumber} onChange={(e) => setShotNumber(e.target.value)} placeholder="Shot Number" required />
                <input type="number" value={ptsType} onChange={(e) => setPtsType(e.target.value)} placeholder="Points Type (2 or 3)" required />
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="H">Home</option>
                    <option value="A">Away</option>
                </select>
                <select value={winning} onChange={(e) => setWinning(e.target.value)}>
                    <option value="W">Winning</option>
                    <option value="L">Losing</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict Shot'}
                </button>
            </form>
            {result && (
                <div>
                    <h3>Prediction Result:</h3>
                    <p>The shot is predicted to be: {result.gb_prediction}</p>
                    <p>Probability of making the shot: {(result.gb_probability * 100).toFixed(2)}%</p>
                </div>
            )}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>} {/* Display error message */}
        </div>
    );
};

export default Basketball;
