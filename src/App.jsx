import { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleSuccess = () => {
    setRefreshFlag(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-800 flex flex-col items-center py-10 px-4">
      <FeedbackForm onSuccess={handleSuccess} />
      <FeedbackList refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;
