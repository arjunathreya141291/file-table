import { useState, useEffect, useRef } from 'react';
import type { File } from '../types';

export const useFileSelection = (files: File[]) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

  const availableFiles = files.filter(file => file.status === 'available');
  const allSelected =
    availableFiles.length > 0 &&
    availableFiles.every(availableFile => selectedFiles.has(availableFile.id));
  const onlySomeSelected = selectedFiles.size > 0 && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = onlySomeSelected;
    }
  }, [onlySomeSelected, selectedFiles]);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedFiles(new Set());
    } else {
      const allAvailableIds = availableFiles.map(file => file.id);
      setSelectedFiles(new Set(allAvailableIds));
    }
  };

  const handleCheckboxSelection = (id: string) => {
    setSelectedFiles(prev => {
      const copy = new Set(prev);
      if (copy.has(id)) {
        copy.delete(id);
      } else {
        copy.add(id);
      }
      return copy;
    });
  };

  const clearSelection = () => {
    setSelectedFiles(new Set());
  };

  const getSelectedFiles = () => {
    return files.filter(file => selectedFiles.has(file.id));
  };

  return {
    selectedFiles,
    selectAllRef,
    availableFiles,
    allSelected,
    onlySomeSelected,
    handleSelectAll,
    handleCheckboxSelection,
    clearSelection,
    getSelectedFiles,
  };
};
