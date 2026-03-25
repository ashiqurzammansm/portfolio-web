// app/admin/page.tsx

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-2xl mt-2">0</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-2xl mt-2">0</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Visitors</h2>
          <p className="text-2xl mt-2">0</p>
        </div>

      </div>
    </div>
  );
}