import { useState, useCallback } from 'react';

export default function useSortStat() {
  const [targetStat, setTargetStat] = useState('');
  const [desc, setDesc] = useState(false);

  const handleOnSelectStat = (statName) => () => {
    if (targetStat === statName) {
      setDesc(!desc);
      setTargetStat(statName);
    } else {
      setDesc(false);
      setTargetStat(statName);
    }
  };

  const sorted = useCallback(
    (stats) =>
      stats.sort((a, b) => {
        if (desc) return a.stat[targetStat] - b.stat[targetStat];
        return b.stat[targetStat] - a.stat[targetStat];
      }),
    [targetStat, desc],
  );

  return [sorted, handleOnSelectStat];
}
