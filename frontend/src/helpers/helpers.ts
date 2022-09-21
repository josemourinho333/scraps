export const formatLocation = (location: string) => {
  const noBracketsLowerCase = location.trim().replace('(', '').replace(')', '').toLowerCase();
  const editLocation = noBracketsLowerCase.split(' ').map((block) => {
    const upperCase = block.slice(0, 1).toUpperCase();
    return block.replace(block[0], upperCase);
  });

  return editLocation.join(' ');
};

export const formatDesc = (desc: string) => {
  const newDesc = desc.slice(26).trim().split(' ').map((word: string) => {
    if (word.includes('\n')) {
      return word.replace(/[\r\n]/gm, '');
    }

    if (word.includes(',')) {
      return word.replace(',', '');
    }

    if (word.includes(':')) {
      return word.replace(':', '');
    }

    return word;
  }).join(' ');

  return newDesc;
};

export const formatTitle = (title: string) => {
  const model: string[] = title.toLowerCase().split(' ').filter((word) => word.includes('macbook') || word.includes('pro') || word.includes('air')).map((word) => {
    const trimmed = word.trim();
    if (trimmed.includes(',')) {
      return trimmed.replace(',', '');
    }

    return trimmed;
  }); 
  const newModel = [...new Set(model)].join(' ');
  return newModel;
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

export const analyzePrice = (price: string | number | undefined, median: number | string) => {
  if (price === undefined) return undefined;

  if (price <= median && price > (median as number - 100)) {
    return 'Average';
  } else if (price <= (median as number - 100) && price > (median as number - 300)) {
    return 'Good';
  } else if (price <= (median as number - 300) && price > (median as number - 500)) {
    return 'Great';
  } else if (price <= (median as number - 500)) {
    return 'Too low';
  } else if (price >= median) {
    return 'Bad';
  }
};