import React, { useState } from 'react';

const Cricket = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState('');

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedImage) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch('http://localhost:4000/api/evaluation/evaluate-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(`Stance: ${data.result} (Angle: ${data.angle.toFixed(2)} degrees)`);
        } catch (error) {
            console.error('Error:', error);
            setResult('Error in evaluation.');
        }
    };

    return (
        <div>
            <h1>Cricket</h1>
            <p>Learn about Cricket</p>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} required />
                <button type="submit">Upload Image</button>
            </form>
            {result && (
                <div style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
                    {result}
                </div>
            )}
        </div>
    );
};

export default Cricket;
