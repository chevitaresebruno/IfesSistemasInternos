import React, { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Fuse from 'fuse.js';


export interface FuzzySearchInputProps
{
    label: string;
    color?: "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined;
    list: string[];
} 

const FuzzySearchInput: React.FC<FuzzySearchInputProps> = ({ label, color = "primary", list }) =>
{
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Inicializa Fuse uma vez, sempre que a lista mudar
  const fuse = useMemo(() => new Fuse(list, { threshold: 0.4 }), [list]);

  useEffect(() => {
    if (!inputValue) {
      setResults([]);
      return;
    }
    const res = fuse.search(inputValue);
    setResults(res.map(r => r.item));
  }, [inputValue, fuse]);

  return (
    <div>
      <TextField
        label={label}
        color={color}
        fullWidth
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul style={{ marginTop: 8, paddingLeft: 16 }}>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}


export default FuzzySearchInput;

