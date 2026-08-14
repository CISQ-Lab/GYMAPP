export default function LogCard({ log, title }) {
  return (
    <div className="flex flex-col justify-between  bg-white shadow-md rounded p-4 m-2 text-gray-800">

      <h3 className="pb-1 border-b-2 border-double">{title}</h3>

      {log.map((log, index) => (
        <p key={index} className="py-1">{log.title + ": " + log.value}</p>
      ))}

    </div>
  );
}