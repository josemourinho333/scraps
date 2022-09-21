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

  const settings: any = {
    segment: [5, 10, 20, 30],
  };

  for (let i = 0; i < settings.segment.length; i++) {
    const range = settings.segment[i];
    const rangeTarget = Math.floor(median as number * (range / 100));
    settings[range] = rangeTarget;
  };

  const great = (price as number - (median as number - settings[30])) * (price as number - (median as number)) <= 0;
  const good = (price as number - (median as number - settings[20])) * (price as number - (median as number)) <= 0;
  const okay = (price as number - (median as number - settings[10])) * (price as number - (median as number)) <= 0;
  const avg = (price as number - (median as number - settings[5])) * (price as number - (median as number)) <= 0;

  if (great && !good && !okay && !avg) {
    return 'Great';
  } else if (good && !great && !okay && !avg) {
    return 'Good';
  } else if (okay && !good && !avg && !great) {
    return 'Okay';
  } else if (avg && !good && !great && !okay) {
    return 'Average';
  } else if (!avg && !okay && !good && !great) {
    return 'Bad';
  }
};