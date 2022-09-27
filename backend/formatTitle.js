const formatTitle = (title) => {
  const model = title.toLowerCase().split(' ').filter((word) => word.includes('macbook') || word.includes('pro') || word.includes('air')).map((word) => {
    const trimmed = word.trim();
    if (trimmed.includes(',')) {
      return trimmed.replace(',', '');
    }

    return trimmed;
  }); 
  const newModel = [...new Set(model)].join(' ');
  return newModel;
};

module.exports = formatTitle;