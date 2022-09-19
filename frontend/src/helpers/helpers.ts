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