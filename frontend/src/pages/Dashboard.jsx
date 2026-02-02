import { useAuth } from '../context/AuthContext';
// Fetch from /api/symptoms/history (add endpoint similarly)

const Dashboard = () => {
  const { user } = useAuth();
  // Dummy data - replace with API fetch
  const history = [];  // [{date: '..', recs: []}]

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-12">Health Journey, {user?.name}</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <h3 className="text-2xl font-bold mb-4">Past Entries</h3>
          {history.map((h, i) => (
            <div key={i} className="p-4 border-b last:border-b-0">
              <p>{new Date(h.timestamp).toLocaleDateString()}</p>
              {/* Summary */}
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Trends</h3>
          {/* Charts via API trends */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
