import { useState } from 'react';
import useCollection from '../hooks/useCollection';
import { Plus, Trash2, Loader, FileText, AlertCircle, Tag } from 'lucide-react';

const CATEGORIES = ['Business Templates', 'Member Resources', 'Innovation & R&D'];

const categoryColors = {
  'Business Templates': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Member Resources':   'bg-white/10 text-white/70 border-white/20',
  'Innovation & R&D':  'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

export default function ManageValueVault() {
  const { items, loading, errorMsg, setErrorMsg, uploadProgress, addItem, deleteItem } = useCollection('value_vault');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', content: '', category: CATEGORIES[0] });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filterCat, setFilterCat] = useState('all');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setErrorMsg('');
    const files = {};
    if (imageFile) files.imageUrl = { file: imageFile, fieldName: 'image' };
    if (pdfFile)   files.pdfUrl   = { file: pdfFile,   fieldName: 'pdf'   };
    await addItem(form, files);
    if (!errorMsg) {
      setForm({ title: '', description: '', content: '', category: CATEGORIES[0] });
      setImageFile(null);
      setPdfFile(null);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this resource?')) return;
    await deleteItem(id);
  };

  const filtered = filterCat === 'all' ? items : items.filter((i) => i.category === filterCat);

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Manage Value Vault</h2>

      {/* Add Resource Form */}
      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 mb-8">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Add New Resource</h3>

        <div className="mb-4">
          <label className="block text-white/60 text-[11px] font-bold mb-2 tracking-[0.1em] uppercase">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-orange appearance-none cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Resource / Article Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4"
          required
        />
        <textarea
          placeholder="Short Summary / Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4"
        />
        <textarea
          placeholder="Full Article Content (Optional - for articles/guides without downloadable PDF)"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4"
        />

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer bg-bg-primary border border-white/10 rounded-xl px-4 py-3 hover:border-accent-orange transition-colors">
            <Plus size={16} /> Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
          </label>
          {imageFile && <span className="text-text-muted text-sm">{imageFile.name}</span>}

          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer bg-bg-primary border border-white/10 rounded-xl px-4 py-3 hover:border-accent-teal transition-colors">
            <FileText size={16} /> Upload PDF
            <input type="file" accept=".pdf" className="hidden" onChange={(e) => setPdfFile(e.target.files[0])} />
          </label>
          {pdfFile && <span className="text-text-muted text-sm">{pdfFile.name}</span>}

          <button
            type="submit"
            disabled={saving}
            className="ml-auto bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader className="animate-spin" size={16} /> : <Plus size={16} />}
            Add Resource
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filterCat === cat
                ? 'bg-accent-orange text-white'
                : 'bg-bg-card text-text-muted border border-white/10 hover:text-text-primary'
            }`}
          >
            {cat === 'all' ? `All (${items.length})` : `${cat} (${items.filter((i) => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Resource List */}
      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No resources in this category yet.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-center gap-4">
              {item.image_url && <img src={item.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-text-primary font-semibold truncate">{item.title}</h4>
                  <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-medium ${categoryColors[item.category] || 'bg-white/10 text-white/50 border-white/20'}`}>
                    <Tag size={10} />
                    {item.category}
                  </span>
                </div>
                <p className="text-text-muted text-sm truncate">{item.description}</p>
                {item.pdf_url && (
                  <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="text-accent-teal text-xs hover:underline">View PDF</a>
                )}
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
