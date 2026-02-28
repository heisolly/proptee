export default function AdminDashboard() {
  const stats = [
    { name: 'Total Properties', value: '124', change: '+12%', type: 'increase' },
    { name: 'Active Agents', value: '38', change: '+3', type: 'increase' },
    { name: 'Blog Views', value: '12.5k', change: '+18%', type: 'increase' },
    { name: 'Pending Listings', value: '7', change: '-2', type: 'decrease' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[#6B7280] text-sm font-medium">{stat.name}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-[#000000]">{stat.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.type === 'increase' ? 'bg-[#1F7A5C]/10 text-[#1F7A5C]' : 'bg-red-100 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-[#E0E0E0] shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-[#000000]">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 pb-6 border-b border-[#F2F2F2] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[#F2F2F2] flex-shrink-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#0F3D2E]"></div>
                </div>
                <div>
                  <p className="text-sm text-[#000000]">
                    <span className="font-bold">New listing</span> added by <span className="font-bold">Agent Smith</span>
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#E0E0E0] shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-[#000000]">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-[#E0E0E0] hover:border-[#1F7A5C] hover:bg-[#F2F2F2] transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#F2F2F2] group-hover:bg-[#0F3D2E] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                +
              </div>
              <span className="text-sm font-bold text-[#000000]">Add Property</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-[#E0E0E0] hover:border-[#1F7A5C] hover:bg-[#F2F2F2] transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#F2F2F2] group-hover:bg-[#0F3D2E] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                ✎
              </div>
              <span className="text-sm font-bold text-[#000000]">Write Blog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
