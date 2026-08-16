import { useState } from 'react';
import useCollection from '../hooks/useCollection';
import { Plus, Trash2, Pencil, Loader, X, AlertCircle } from 'lucide-react';

export default function ManageHeroSlides() {
  const { items, loading, errorMsg, setErrorMsg, uploadProgress, addItem, updateItem, deleteItem } = useCollection('hero_slides');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ heading: '', subtext: '', ctaText: '', ctaLink: '', order: 0 });
  const [imageFile, setImageFile] = useState(null);

  const resetForm = () => {
    setForm({ heading: '', subtext: '', ctaText: '', ctaLink: '', order: 0 });
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      heading: item.heading || '',
      subtext: item.subtext || '',
      ctaText: item.cta_text || '',
      ctaLink: item.cta_link || '',
      order: item.sort_order || 0,
    });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.heading.trim()) return;
    setSaving(true);
    setErrorMsg('');
    const files = imageFile ? { imageUrl: { file: imageFile, fieldName: 'image' } } : {};
    if (editingId) {
      await updateItem(editingId, { heading: form.heading, subtext: form.subtext, ctaText: form.ctaText, ctaLink: form.ctaLink, order: Number(form.order) }, files);
    } else {
      await addItem({ heading: form.heading, subtext: form.subtext, ctaText: form.ctaText, ctaLink: form.ctaLink, order: Number(form.order) }, files);
    }
    if (!errorMsg) resetForm();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this slide?')) return;
    await deleteItem(id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Manage Hero Slides</h2>

      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-accent-teal text-sm font-semibold">Editing slide...</span>
            <button type="button" onClick={resetForm} className="text-text-muted hover:text-white text-sm flex items-center gap-1">
              <X size={14} /> Cancel
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Heading" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" required />
          <input type="number" placeholder="Order (0, 1, 2...)" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
        </div>
        <textarea placeholder="Subtext" value={form.subtext} onChange={(e) => setForm({ ...form, subtext: e.target.value })} rows={2} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="CTA Button Text (e.g. Explore Services)" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
          <input type="text" placeholder="CTA Link (e.g. /services or #contact)" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer bg-bg-primary border border-white/10 rounded-xl px-4 py-3 hover:border-accent-orange transition-colors">
            <Plus size={16} /> {editingId ? 'Change Image' : 'Upload Background'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
          </label>
          {imageFile && <span className="text-text-muted text-sm">{imageFile.name}</span>}
          <button type="submit" disabled={saving} className="ml-auto bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2">
            {saving ? <Loader className="animate-spin" size={16} /> : editingId ? <Pencil size={16} /> : <Plus size={16} />}
            {editingId ? 'Update Slide' : 'Add Slide'}
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
        <div className="text-center py-12 text-text-muted">No hero slides yet. Default slides will be shown.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-center gap-4">
              {item.image_url ? (
                <img src={item.image_url} alt="" className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-20 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-text-muted text-xs">No img</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent-orange text-xs font-bold">#{item.sort_order}</span>
                  <h4 className="text-text-primary font-semibold truncate">{item.heading}</h4>
                </div>
                <p className="text-text-muted text-sm truncate">{item.subtext}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(item)} className="text-accent-teal hover:text-accent-teal/80 p-2 transition-colors"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
