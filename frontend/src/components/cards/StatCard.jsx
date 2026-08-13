function StatCard({ title, value }) {
  return (
    <div className="stat-card bg-white shadow-md rounded p-4 m-2">
      
      <div className="stat-card-content">
        <h3 className="stat-card-title">{title}</h3>
        <p className="stat-card-value">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;