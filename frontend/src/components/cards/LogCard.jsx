export default function LogCard({ title, children }) {
  return (
    <div className="flex flex-col bg-white shadow-sm border border-gray-100 rounded-xl p-5 m-2 text-gray-800">
      <h3 className="text-base font-semibold text-gray-900 pb-3 mb-2 border-b border-gray-100">
        {title}
      </h3>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}