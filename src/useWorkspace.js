import { useCallback, useRef, useState } from 'react';
import { createSampleWorkspace } from './course/sampleWorkspace.js';

export function useWorkspace() {
  const [workspace, setWorkspace] = useState(createSampleWorkspace);
  const [saveError, setSaveError] = useState(false);
  const current = useRef(workspace);

  const commit = useCallback((change) => {
    try {
      const updated = change(current.current);
      current.current = updated;
      setWorkspace(updated);
      setSaveError(false);
      return true;
    } catch {
      setSaveError(true);
      return false;
    }
  }, []);

  const clearSaveError = useCallback(() => setSaveError(false), []);
  return { workspace, commit, saveError, clearSaveError };
}
