'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Mail, Phone, Edit, Trash2, X } from 'lucide-react';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<any>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setAgents(data || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const agentData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      bio: formData.get('bio'),
    };

    if (currentAgent) {
      await supabase.from('agents').update(agentData).eq('id', currentAgent.id);
    } else {
      await supabase.from('agents').insert([agentData]);
    }

    setIsModalOpen(false);
    setCurrentAgent(null);
    fetchAgents();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      await supabase.from('agents').delete().eq('id', id);
      fetchAgents();
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#0F3D2E] focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { setCurrentAgent(null); setIsModalOpen(true); }}
          className="bg-[#0F3D2E] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#1F7A5C] transition-colors"
        >
          <Plus size={18} /> Add Agent
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F2F2F2] border-b border-[#E0E0E0]">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Agent</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Contact</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Joined Date</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#6B7280]">Loading agents...</td>
              </tr>
            ) : filteredAgents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#6B7280]">No agents found.</td>
              </tr>
            ) : (
              filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-[#F2F2F2]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white font-bold">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#000000]">{agent.name}</p>
                        <p className="text-xs text-[#6B7280] line-clamp-1 max-w-[200px]">{agent.bio || 'No bio provided'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#000000]">
                        <Mail size={14} className="text-[#6B7280]" /> {agent.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#000000]">
                        <Phone size={14} className="text-[#6B7280]" /> {agent.phone || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">
                    {new Date(agent.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setCurrentAgent(agent); setIsModalOpen(true); }}
                        className="p-2 text-[#0F3D2E] hover:bg-[#0F3D2E]/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(agent.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E0E0E0]">
            <div className="p-6 border-b border-[#E0E0E0] flex justify-between items-center bg-[#F2F2F2]">
              <h3 className="text-xl font-bold text-[#000000]">
                {currentAgent ? 'Edit Agent' : 'Add New Agent'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#6B7280] hover:text-[#000000]">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#000000] mb-1">Full Name</label>
                <input 
                  name="name"
                  defaultValue={currentAgent?.name}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#000000] mb-1">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  defaultValue={currentAgent?.email}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#000000] mb-1">Phone Number</label>
                <input 
                  name="phone"
                  defaultValue={currentAgent?.phone}
                  className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#000000] mb-1">Biography</label>
                <textarea 
                  name="bio"
                  rows={3}
                  defaultValue={currentAgent?.bio}
                  className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-lg border border-[#E0E0E0] font-bold text-[#000000] hover:bg-[#F2F2F2] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-[#0F3D2E] text-white font-bold hover:bg-[#1F7A5C] transition-colors shadow-lg"
                >
                  {currentAgent ? 'Update Agent' : 'Create Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
