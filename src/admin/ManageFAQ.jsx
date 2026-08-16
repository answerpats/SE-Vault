import { useState } from 'react';
import useCollection from '../hooks/useCollection';
import { Plus, Trash2, Pencil, Loader, X, AlertCircle } from 'lucide-react';

export default function ManageFAQ() {
  const { items, loading, errorMsg, setErrorMsg, addItem, updateItem, deleteItem } = useCollection('faqs');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', order: 0 });

  const resetForm = () => {
    setForm({ question: '', answer: '', order: 0 });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      question: item.question || '',
      answer: item.answer || '',
      order: item.sort_order || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) return;
    setSaving(true);
    setErrorMsg('');
    const data = { question: form.question, answer: form.answer, order: Number(form.order) };
    if (editingId) {
      await updateItem(editingId, data);
    } else {
      await addItem(data);
    }
    if (!errorMsg) resetForm();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    await deleteItem(id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Manage FAQs</h2>

      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-accent-teal text-sm font-semibold">Editing FAQ...</span>
            <button type="button" onClick={resetForm} className="text-text-muted hover:text-white text-sm flex items-center gap-1">
              <X size={14} /> Cancel
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-4">
          <input type="text" placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" required />
          <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full md:w-24 px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
        </div>
        <textarea placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={3} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4" required />

        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            <AlertCircle size={16} className="flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2">
            {saving ? <Loader className="animate-spin" size={16} /> : editingId ? <Pencil size={16} /> : <Plus size={16} />}
            {editingId ? 'Update FAQ' : 'Add FAQ'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No FAQs added yet.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-bg-card border border-white/10 rounded-xl p-4">
              <div className="flex items-start gap-4">
                <span className="text-accent-orange text-xs font-bold mt-1">#{item.sort_order}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-primary font-semibold mb-1">{item.question}</h4>
                  <p className="text-text-muted text-sm line-clamp-2">{item.answer}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(item)} className="text-accent-teal hover:text-accent-teal/80 p-2 transition-colors"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
