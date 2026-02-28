'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Home, MapPin, DollarSign, Edit, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function PropertiesPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentListing, setCurrentListing] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [listingsRes, categoriesRes] = await Promise.all([
      supabase.from('listings').select('*, profiles(full_name), categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name').eq('type', 'listing')
    ]);

    if (!listingsRes.error) setListings(listingsRes.data || []);
    if (!categoriesRes.error) setCategories(categoriesRes.data || []);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('listings').update({ status }).eq('id', id);
    if (!error) fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      await supabase.from('listings').delete().eq('id', id);
      fetchData();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} className="text-[#1F7A5C]" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'rejected': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#0F3D2E] focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { setCurrentListing(null); setIsModalOpen(true); }}
          className="bg-[#0F3D2E] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#1F7A5C] transition-colors"
        >
          <Plus size={18} /> Add Property
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F2F2F2] border-b border-[#E0E0E0]">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Property</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Price & Type</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Status</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Agent</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#6B7280]">Loading listings...</td>
              </tr>
            ) : filteredListings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#6B7280]">No properties found.</td>
              </tr>
            ) : (
              filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-[#F2F2F2]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#F2F2F2] flex items-center justify-center text-[#0F3D2E]">
                        <Home size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-[#000000]">{listing.title}</p>
                        <p className="text-xs text-[#6B7280] flex items-center gap-1">
                          <MapPin size={12} /> {listing.address || 'No address'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#0F3D2E]">${listing.price.toLocaleString()}</p>
                    <p className="text-xs uppercase font-bold text-[#6B7280]">{listing.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      listing.status === 'approved' ? 'bg-[#1F7A5C]/10 text-[#1F7A5C]' : 
                      listing.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {getStatusIcon(listing.status)}
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#000000]">
                    {listing.profiles?.full_name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {listing.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(listing.id, 'approved')}
                            className="p-2 text-[#1F7A5C] hover:bg-[#1F7A5C]/10 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(listing.id, 'rejected')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleDelete(listing.id)}
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#E0E0E0] my-8">
            <div className="p-6 border-b border-[#E0E0E0] flex justify-between items-center bg-[#F2F2F2]">
              <h3 className="text-xl font-bold text-[#000000]">
                {currentListing ? 'Edit Property' : 'Add New Property'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#6B7280] hover:text-[#000000]">
                <XCircle size={24} />
              </button>
            </div>
      {isModalOpen && currentListing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-[#E0E0E0] my-8">
            <div className="p-8 border-b border-[#E0E0E0] flex justify-between items-center bg-[#F2F2F2]">
              <h3 className="text-xl font-bold text-[#000000]">
                Property Details
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#6B7280] hover:text-[#000000]">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Title</label>
                  <p className="font-bold text-[#0F3D2E]">{currentListing.title}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price</label>
                  <p className="font-bold text-[#0F3D2E]">₦{currentListing.price?.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</label>
                  <p className="font-bold text-[#0F3D2E]">{currentListing.address}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type</label>
                  <p className="font-bold text-[#0F3D2E] uppercase">{currentListing.type}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</label>
                  <p className="font-bold text-[#0F3D2E] uppercase">{currentListing.status}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{currentListing.description || 'No description provided.'}</p>
              </div>
              <div className="pt-6 flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-4 rounded-2xl border border-[#E0E0E0] font-bold text-[#000000] hover:bg-[#F2F2F2] transition-colors"
                >
                  Close
                </button>
                {currentListing.status === 'pending' && (
                  <button 
                    onClick={() => { handleUpdateStatus(currentListing.id, 'approved'); setIsModalOpen(false); }}
                    className="flex-1 py-4 rounded-2xl bg-[#0F3D2E] text-white font-bold hover:bg-[#1F7A5C] transition-colors shadow-lg"
                  >
                    Approve Property
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </div>
  );
}
