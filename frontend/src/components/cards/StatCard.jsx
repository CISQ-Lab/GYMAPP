function StatCard({ title, value }) {
  return (
    <div className="flex flex-row justify-between items-center bg-white shadow-md rounded p-6 m-2 text-gray-800">
      
        <h3 className="stat-card-title">{title}</h3>
        <p className="stat-card-value">{value}</p>
      
    </div>
  );
}

export default StatCard;