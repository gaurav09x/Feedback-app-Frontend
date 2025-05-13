import { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = ({ refreshFlag }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('https://feedback-app-backend-9ox0.onrender.com/feedback');
        setFeedbacks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeedbacks();
  }, [refreshFlag]);

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-4xl mt-12">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400 mb-6 text-center">What are they saying</h2>
      <div className="space-y-4">
        {feedbacks.length === 0 && <p className="text-gray-300 text-center">No feedback yet.</p>}
        {feedbacks.reverse().map(fb => (
          <div key={fb._id} className="bg-white/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-900">{fb.name}</p>
              <p className="text-sm text-gray-700">{new Date(fb.timestamp).toLocaleString('en-gb')}</p>
            </div>
            <p className="text-sm text-gray-700 mt-2">{fb.email}</p>
            <p className="text-gray-800">{fb.message}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
