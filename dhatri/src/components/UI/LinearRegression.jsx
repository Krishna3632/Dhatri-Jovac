import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LinearRegressionFromScratch = () => {
  const [m, setM] = useState(0); // slope
  const [b, setB] = useState(0); // intercept
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [cost, setCost] = useState(0);
  const [costHistory, setCostHistory] = useState([]);
  
  // Generate sample data: y = 2x + 1 + noise
  const [data] = useState(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const x = i;
      const y = 2 * x + 1 + (Math.random() - 0.5) * 5;
      points.push({ x, y });
    }
    return points;
  });

  // Prediction function: y = mx + b
  const predict = (x, slope, intercept) => {
    return slope * x + intercept;
  };

  // Cost function (Mean Squared Error)
  const computeCost = (slope, intercept) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const prediction = predict(data[i].x, slope, intercept);
      const error = prediction - data[i].y;
      sum += error * error;
    }
    return sum / (2 * data.length);
  };

  // Gradient Descent step
  const gradientDescentStep = (currentM, currentB, lr) => {
    let mGradient = 0;
    let bGradient = 0;
    const n = data.length;

    // Calculate gradients
    for (let i = 0; i < n; i++) {
      const x = data[i].x;
      const y = data[i].y;
      const prediction = predict(x, currentM, currentB);
      const error = prediction - y;
      
      mGradient += (error * x) / n;
      bGradient += error / n;
    }

    // Update parameters
    const newM = currentM - lr * mGradient;
    const newB = currentB - lr * bGradient;

    return { newM, newB };
  };

  // Training function
  const train = () => {
    if (isTraining) return;
    
    setIsTraining(true);
    let currentM = m;
    let currentB = b;
    let history = [...costHistory];
    let currentEpoch = epochs;
    
    const interval = setInterval(() => {
      currentEpoch++;
      
      if (currentEpoch >= 200) {
        clearInterval(interval);
        setIsTraining(false);
        setEpochs(currentEpoch);
        return;
      }
      
      // Perform gradient descent
      const { newM, newB } = gradientDescentStep(currentM, currentB, learningRate);
      currentM = newM;
      currentB = newB;
      
      // Update state
      setM(currentM);
      setB(currentB);
      setEpochs(currentEpoch);
      
      const currentCost = computeCost(currentM, currentB);
      setCost(currentCost);
      
      if (currentEpoch % 5 === 0) {
        history.push({ epoch: currentEpoch, cost: currentCost });
        setCostHistory([...history]);
      }
    }, 50);
  };

  const reset = () => {
    setM(0);
    setB(0);
    setEpochs(0);
    setCost(0);
    setCostHistory([]);
    setIsTraining(false);
  };

  // Create combined chart data
  const chartData = data.map(point => ({
    x: point.x,
    actual: point.y,
    predicted: predict(point.x, m, b)
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Linear Regression from Scratch</h1>
      <p className="text-gray-600 mb-6">Watch gradient descent find the best fit line in real-time!</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Panel - Visualization */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Data & Prediction</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} dot={false} name="Model Prediction" />
              <Line type="monotone" dataKey="actual" stroke="#8b5cf6" strokeWidth={0} dot={{ fill: '#8b5cf6', r: 5 }} name="Actual Data" />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm font-mono text-gray-700">
              <strong>Equation:</strong> y = {m.toFixed(3)}x + {b.toFixed(3)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              (Target: y ≈ 2x + 1)
            </p>
          </div>
        </div>

        {/* Right Panel - Cost Function */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Cost Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} dot={false} name="Cost (MSE)" />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-3 bg-red-50 rounded">
            <p className="text-sm font-mono text-gray-700">
              <strong>Current Cost (MSE):</strong> {cost.toFixed(4)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Lower cost = better fit
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Training Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Rate: {learningRate.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              disabled={isTraining}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Controls step size</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Epochs: {epochs} / 200
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(epochs / 200) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Training iterations</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="text-lg font-semibold">
              {isTraining ? (
                <span className="text-green-600">🟢 Training...</span>
              ) : epochs === 0 ? (
                <span className="text-gray-600">⚪ Ready</span>
              ) : (
                <span className="text-blue-600">🔵 Complete</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={train}
            disabled={isTraining || epochs >= 200}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {epochs === 0 ? 'Start Training' : epochs >= 200 ? 'Training Complete' : 'Continue Training'}
          </button>
          
          <button
            onClick={reset}
            disabled={isTraining}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Explanation Panel */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">How It Works</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong className="text-gray-800">1. Model:</strong> y = mx + b (find best m and b)</p>
          <p><strong className="text-gray-800">2. Cost Function:</strong> MSE = Σ(prediction - actual)² / 2n</p>
          <p><strong className="text-gray-800">3. Gradient Descent:</strong> Adjust m and b to minimize cost</p>
          <p><strong className="text-gray-800">4. Learning Rate:</strong> Controls how big each adjustment step is</p>
          <p className="pt-2 text-xs italic">The algorithm is learning the pattern in the data by repeatedly improving its guess!</p>
        </div>
      </div>
    </div>
  );
};

export default LinearRegressionFromScratch;