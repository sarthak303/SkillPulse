import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Tennis1.css'; // Import the CSS file

const Tennis1 = () => {
  const handleGetStarted = () => {
    // Define your action here (e.g., redirecting to a signup page)
  };

  return (
    <div className="flex flex-col min-h-screen">
  {/* Main Content */}
  <main className="flex-grow">
    {/* Hero Section */}
    <section className="hero-section text-black relative w-full h-full">
      <div className="relative w-full h-full"> {/* Full screen size */}
        <img
          src="https://i.postimg.cc/6qY2vDtX/tennis.png"
          alt="tennis"
          className="object-cover w-full h-full absolute top-0 left-0"
        />
      </div>
    </section>

        {/* Description Section */}
        <section className="container mx-auto px-4 py-12 text-center description-section">
          <h2 className="text-3xl font-bold mb-4 text-black">Unlock Your Potential</h2>
          
          {/* "TENNIS" heading */}
          <h3 className="text-5xl font-bold mb-8 text-black" style={{ fontFamily: 'Silkscreen, cursive' }}>
            TENNIS
          </h3>
          
          {/* Description paragraph */}
          <p className="max-w-2xl mx-auto mb-8 text-black myc">
            A tennis performance analyser tracks metrics like serve speed, shot accuracy, spin, and movement on the
            court. Advanced AI algorithms analyze a player's technique, footwork, and decision-making
            to help players refine their strokes, improve court positioning, and develop strategies for different
            opponents, enhancing overall performance.
          </p>
          
          {/* Subheading for performance */}
          <h4 className="text-xl font-semibold mb-4">Elevate Your Performance</h4>
          
          {/* Additional description */}
          <p className="max-w-2xl mx-auto mb-8 text-black">
            Revolutionize Your Sports Journey with AI-Powered Analytics
          </p>
          
          {/* Get Started button */}
          <button 
            className="bg-blue-600 text-black px-6 py-3 rounded-full flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Tennis Analyser. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Tennis1;
