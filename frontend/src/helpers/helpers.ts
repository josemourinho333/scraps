export const formatLocation = (location: string) => {
  const noBracketsLowerCase = location.trim().replace('(', '').replace(')', '').toLowerCase();
  const editLocation = noBracketsLowerCase.split(' ').map((block) => {
    const upperCase = block.slice(0, 1).toUpperCase();
    return block.replace(block[0], upperCase);
  });

  return editLocation.join(' ');
};

export const formatDate = (date: string) => {
  const calendarDate = date.split(' ')[0];
  const time = date.split(' ')[1];
  return [calendarDate, time];
};

export const capitalizeWord = (word: string) => {
  const newWord = word.split('').map((char, index) => {
    if (index === 0) {
      return char.toUpperCase();
    }

    return char;
  }).join('');

  return newWord;
};

export const getMedian = (set: number[]): number => {
  if (!set.length) {
    return 0;
  };

  const sorted = [...set].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ?
      ((sorted[middle - 1] + sorted[middle]) / 2) : sorted[middle];
};