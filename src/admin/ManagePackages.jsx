import { useState } from 'react';
import useCollection from '../hooks/useCollection';
import { iconNames, PackageIcon } from '../data/packageIcons';
import { Plus, Trash2, Pencil, Loader, X, AlertCircle, Star } from 'lucide-react';

const emptyForm = {
  title: '',
  subtitle: '',
  description: '',
  price: '',
  icon: 'Package',
  features: '',
  highlighted: false,
  order: 0,
};

export default function ManagePackages() {
  const { items, loading, errorMsg, setErrorMsg, uploadProgress, addItem, updateItem, deleteItem } =
    useCollection('packages');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      price: item.price || '',
      icon: item.icon || 'Package',
      features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '',
      highlighted: !!item.highlighted,
      order: item.sort_order ?? 0,
    });
    setImageFile(null);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setErrorMsg('');

    const fields = {
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      price: form.price,
      icon: form.icon,
      // Newline-separated in the UI, sent as JSON so the API stores a clean array
      features: JSON.stringify(
        form.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean)
      ),
      highlighted: form.highlighted ? 'true' : 'false',
      order: Number(form.order) || 0,
    };
    const files = imageFile ? { imageUrl: { file: imageFile, fieldName: 'image' } } : {};

    if (editingId) {
      await updateItem(editingId, fields, files);
    } else {
      await addItem(fields, files);
    }
    if (!errorMsg) resetForm();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this package? This removes it from the website.')) return;
    await deleteItem(id);
    if (editingId === id) resetForm();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Manage Service Packages</h2>
      <p className="text-text-muted text-sm mb-6">
        Every package shown on the Services page lives here. Edit one and the website updates
        immediately.
      </p>

      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-accent-teal text-sm font-semibold">Editing package...</span>
            <button
              type="button"
              onClick={resetForm}
              className="text-text-muted hover:text-white text-sm flex items-center gap-1"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Package Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange"
            required
          />
          <input
            type="text"
            placeholder="Subtitle (e.g. Small Business Support)"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange"
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4"
        />

        <label className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
          Features — one per line
        </label>
        <textarea
          placeholder={'Business registration & compliance\nBasic bookkeeping & tax filing\nAdministrative support'}
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Price (optional, e.g. UGX 500,000)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange"
          />
          <div className="flex items-center gap-3 bg-bg-primary border border-white/10 rounded-xl px-4 py-3">
            <PackageIcon name={form.icon} size={18} className="text-accent-orange flex-shrink-0" />
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="flex-1 bg-transparent text-text-primary focus:outline-none text-sm"
            >
              {iconNames.map((name) => (
                <option key={name} value={name} className="bg-bg-primary">
                  {name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            placeholder="Order (0, 1, 2...)"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            className="px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange"
          />
        </div>

        <label className="flex items-center gap-3 text-text-muted text-sm cursor-pointer mb-4 select-none">
          <input
            type="checkbox"
            checked={form.highlighted}
            onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
            className="w-4 h-4 accent-accent-orange"
          />
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-accent-orange" />
            Mark as &ldquo;Most Popular&rdquo;
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer bg-bg-primary border border-white/10 rounded-xl px-4 py-3 hover:border-accent-orange transition-colors">
            <Plus size={16} /> {editingId ? 'Change Image' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>
          {imageFile && <span className="text-text-muted text-sm">{imageFile.name}</span>}
          <button
            type="submit"
            disabled={saving}
            className="ml-auto bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <Loader className="animate-spin" size={16} />
            ) : editingId ? (
              <Pencil size={16} />
            ) : (
              <Plus size={16} />
            )}
            {editingId ? 'Update Package' : 'Add Package'}
          </button>
        </div>

        {saving && uploadProgress > 0 && (
          <div className="mt-4">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-accent-orange h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
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
        <div className="text-center py-12 text-text-muted">
          No packages yet. Run <code className="text-accent-teal">/api/setup.php</code> to seed the
          default packages, or add one above.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const features = Array.isArray(item.features) ? item.features : [];
            return (
              <div key={item.id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-start gap-4">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <PackageIcon name={item.icon} size={22} className="text-accent-orange" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-accent-orange text-xs font-bold">#{item.sort_order ?? 0}</span>
                    <h4 className="text-text-primary font-semibold truncate">{item.title}</h4>
                    {item.highlighted && (
                      <span className="bg-accent-orange/15 text-accent-orange text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Most Popular
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-accent-teal text-[11px] font-bold uppercase tracking-wider mb-1">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="text-text-muted text-sm line-clamp-2">{item.description}</p>
                  {features.length > 0 && (
                    <p className="text-text-muted/70 text-xs mt-1">
                      {features.length} feature{features.length === 1 ? '' : 's'}
                    </p>
                  )}
                  {item.price && <p className="text-accent-orange text-sm mt-1">{item.price}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-accent-teal hover:text-accent-teal/80 p-2 transition-colors"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 p-2 transition-colors"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
