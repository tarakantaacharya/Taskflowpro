import { useEffect } from 'react';

export interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      for (const s of shortcuts) {
        if (
          key === s.key.toLowerCase() &&
          (!!s.ctrl === (e.ctrlKey || e.metaKey)) &&
          (!!s.shift === e.shiftKey) &&
          (!!s.alt === e.altKey)
        ) {
          e.preventDefault();
          s.callback();
          break;
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcuts]);
}
