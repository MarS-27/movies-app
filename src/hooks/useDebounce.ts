import { debounce } from '@mui/material';
import { useMemo, useState } from 'react';

export default function useDebounce() {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  const debounceInputValue = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedValue(query);
      }, 1000),
    [],
  );

  return { debouncedValue, debounceInputValue };
}
