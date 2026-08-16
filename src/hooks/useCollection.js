import { useState, useEffect, useCallback } from 'react';
import { apiFetch, apiUpload } from '../api';
import compressImage from '../utils/compressImage';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

function validateFile(file) {
  if (file.type.startsWith('image/') && file.size > MAX_IMAGE_SIZE) {
    return `Image "${file.name}" exceeds 5MB limit. Please choose a smaller file.`;
  }
  if (file.type === 'application/pdf' && file.size > MAX_PDF_SIZE) {
    return `PDF "${file.name}" exceeds 10MB limit. Please choose a smaller file.`;
  }
  return null;
}

export default function useCollection(endpoint, { limit } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      setError(null);
      const params = limit ? `?limit=${limit}` : '';
      const data = await apiFetch(`${endpoint}.php${params}`);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err.message);
      setError(err);
    }
    setLoading(false);
  }, [endpoint, limit]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const addItem = async (fields, files = {}) => {
    setErrorMsg('');
    setUploadProgress(0);
    try {
      // Validate files
      for (const [, { file }] of Object.entries(files)) {
        if (!file) continue;
        const validationError = validateFile(file);
        if (validationError) {
          setErrorMsg(validationError);
          return;
        }
      }

      const hasFiles = Object.values(files).some((f) => f.file);
      if (hasFiles) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(fields)) {
          if (value !== undefined && value !== null) formData.append(key, value);
        }
        for (const [, { file, fieldName }] of Object.entries(files)) {
          if (!file) continue;
          const processed = file.type.startsWith('image/') ? await compressImage(file) : file;
          formData.append(fieldName || 'image', processed);
        }
        await apiUpload(`${endpoint}.php`, formData, setUploadProgress);
      } else {
        await apiFetch(`${endpoint}.php`, {
          method: 'POST',
          body: fields,
          auth: true,
        });
      }

      setUploadProgress(0);
      await fetchItems();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Upload failed. Please try again.');
      setUploadProgress(0);
    }
  };

  const updateItem = async (id, fields, files = {}) => {
    setErrorMsg('');
    setUploadProgress(0);
    try {
      for (const [, { file }] of Object.entries(files)) {
        if (!file) continue;
        const validationError = validateFile(file);
        if (validationError) {
          setErrorMsg(validationError);
          return;
        }
      }

      const hasFiles = Object.values(files).some((f) => f.file);
      if (hasFiles) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(fields)) {
          if (value !== undefined && value !== null) formData.append(key, value);
        }
        for (const [, { file, fieldName }] of Object.entries(files)) {
          if (!file) continue;
          const processed = file.type.startsWith('image/') ? await compressImage(file) : file;
          formData.append(fieldName || 'image', processed);
        }
        await apiUpload(`${endpoint}.php?id=${id}`, formData, setUploadProgress);
      } else {
        await apiFetch(`${endpoint}.php?id=${id}`, {
          method: 'PUT',
          body: fields,
          auth: true,
        });
      }

      setUploadProgress(0);
      await fetchItems();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Update failed. Please try again.');
      setUploadProgress(0);
    }
  };

  const deleteItem = async (id) => {
    setErrorMsg('');
    try {
      await apiFetch(`${endpoint}.php?id=${id}`, { method: 'DELETE', auth: true });
      await fetchItems();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Delete failed. Please try again.');
    }
  };

  return { items, loading, error, errorMsg, setErrorMsg, uploadProgress, addItem, updateItem, deleteItem, refetch: fetchItems };
}
