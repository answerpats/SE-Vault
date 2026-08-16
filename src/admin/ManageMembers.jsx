import { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function ManageMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchMembers = async () => {
    try {
      const data = await apiFetch('members.php', { auth: true });
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleApprove = async (id) => {
    await apiFetch(`members.php?id=${id}`, { method: 'PUT', body: { status: 'approved' }, auth: true });
    fetchMembers();
  };

  const handleReject = async (id) => {
    await apiFetch(`members.php?id=${id}`, { method: 'PUT', body: { status: 'rejected' }, auth: true });
    fetchMembers();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this member?')) return;
    await apiFetch(`members.php?id=${id}`, { method: 'DELETE', auth: true });
    fetchMembers();
  };

  const filtered = filter === 'all' ? members : members.filter((m) => m.status === filter);

  const statusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      approved: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || ''}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Manage Members</h2>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'approved', 'rejected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filter === f
                ? 'bg-accent-orange text-white'
                : 'bg-bg-card text-text-muted border border-white/10 hover:text-text-primary'
            }`}
          >
            {f}
            {f !== 'all' && (
              <span className="ml-1 text-xs">
                ({members.filter((m) => m.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No members found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => (
            <div key={m.id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-text-primary font-semibold">{m.name}</h4>
                  {statusBadge(m.status)}
                </div>
                <p className="text-text-muted text-sm">{m.phone}</p>
                <p className="text-text-muted text-xs mt-1">
                  {m.created_at ? new Date(m.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {m.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(m.id)} className="text-green-400 hover:text-green-300 p-2 transition-colors" title="Approve">
                      <CheckCircle size={20} />
                    </button>
                    <button onClick={() => handleReject(m.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors" title="Reject">
                      <XCircle size={20} />
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(m.id)} className="text-text-muted hover:text-red-400 p-2 transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
