import { useState } from 'react';
import useCollection from '../hooks/useCollection';
import { Plus, Trash2, Loader, ImageIcon, AlertCircle } from 'lucide-react';

export default function ManageGallery() {
  const { items, loading, errorMsg, setErrorMsg, uploadProgress, addItem, deleteItem } = useCollection('gallery');
  const [saving, setSaving] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return;
    setSaving(true);
    setErrorMsg('');
    await addItem(
      { caption: caption.trim() },
      { imageUrl: { file: imageFile, fieldName: 'image' } }
    );
    if (!errorMsg) {
      setCaption('');
      setImageFile(null);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo?')) return;
    await deleteItem(id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Manage Gallery</h2>

      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 mb-8">
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange mb-4"
        />
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer bg-bg-primary border border-white/10 rounded-xl px-4 py-3 hover:border-accent-orange transition-colors">
            <ImageIcon size={16} /> Choose Photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
          </label>
          {imageFile && <span className="text-text-muted text-sm">{imageFile.name}</span>}
          <button
            type="submit"
            disabled={saving || !imageFile}
            className="ml-auto bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader className="animate-spin" size={16} /> : <Plus size={16} />}
            Upload Photo
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
        <div className="text-center py-12 text-text-muted">No photos uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square">
              <img src={item.image_url} alt={item.caption || ''} className="w-full h-full object-cover" />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                </div>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
