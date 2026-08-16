import { useState } from 'react';
import useCollection from '../hooks/useCollection';
import { Plus, Trash2, Loader, AlertCircle } from 'lucide-react';

export default function ManageTestimonials() {
  const { items, loading, errorMsg, setErrorMsg, uploadProgress, addItem, deleteItem } = useCollection('testimonials');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ author: '', role: '', content: '' });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.content.trim()) return;
    setSaving(true);
    setErrorMsg('');
    const files = imageFile ? { avatar: { file: imageFile, fieldName: 'image' } } : {};
    await addItem(form, files);
    if (!errorMsg) {
      setForm({ author: '', role: '', content: '' });
      setImageFile(null);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await deleteItem(id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Manage Testimonials</h2>

      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Client Name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" required />
          <input type="text" placeholder="Role / Company (optional)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
        </div>
        <textarea placeholder="Testimonial content..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4" required />
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer bg-bg-primary border border-white/10 rounded-xl px-4 py-3 hover:border-accent-orange transition-colors">
            <Plus size={16} /> Upload Photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
          </label>
          {imageFile && <span className="text-text-muted text-sm">{imageFile.name}</span>}
          <button type="submit" disabled={saving} className="ml-auto bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2">
            {saving ? <Loader className="animate-spin" size={16} /> : <Plus size={16} />}
            Add Testimonial
          </button>
        </div>

        {saving && uploadProgress > 0 && (
          <div className="mt-4">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-accent-orange h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="text-text-muted text-xs mt-1">{uploadProgress}% uploaded</p>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            <AlertCircle size={16} className="flex-shrink-0" />
            {errorMsg}
          </div>
        )}
      </form>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No testimonials added yet. Default testimonials will be shown on the homepage.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-start gap-4">
              {item.avatar ? (
                <img src={item.avatar} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-accent-orange/15 flex items-center justify-center flex-shrink-0 text-accent-orange font-bold">
                  {item.author?.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-text-primary font-semibold">{item.author}</h4>
                {item.role && <p className="text-text-muted text-xs mb-1">{item.role}</p>}
                <p className="text-text-muted text-sm line-clamp-2">&ldquo;{item.content}&rdquo;</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors flex-shrink-0">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
