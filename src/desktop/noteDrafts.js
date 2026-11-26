import { useCallback, useRef, useState } from 'react';

// Keep drafts available when the Notes view is unmounted during tab navigation.
let draftSession = { drafts: [], activeId: '', reading: false };

export function useNoteDrafts() {
  const [session, setSession] = useState(() => draftSession);
  const current = useRef(session);
  const unpublished = useRef(false);
  const publish = useCallback(() => {
    if (unpublished.current) {
      unpublished.current = false;
      setSession(current.current);
    }
    return current.current;
  }, []);
  const update = useCallback(
    (change, composing = false) => {
      const old = current.current;
      const next = change(old);
      current.current = next;
      draftSession = next;
      unpublished.current = true;
      // Keep Save and the dirty indicator accurate when a composition starts or cancels.
      if (!composing || old.drafts.length !== next.drafts.length) publish();
    },
    [publish]
  );
  return { session, update, publish };
}
