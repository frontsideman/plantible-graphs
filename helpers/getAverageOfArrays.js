// count average: remove nulled items
// and summarize an appropriate items
//  and divide summ to items count,
// if count === 0 or summ === 0 return null;

export default (arrayOfArrays) => {
  const items = {};
  for (let i = 0; i < arrayOfArrays.length; i++) {
    for (let j = 0; j < arrayOfArrays[i].length; j++) {
      if (!items[j]) {
        items[j] = {
          summ: 0,
          count: 0,
        };
      }
      if (arrayOfArrays[i][j] !== null) {
        items[j].summ += arrayOfArrays[i][j];
        items[j].count += 1;
      }
    }
  }

  const averageData = Object.values(items).map(item => {
    if (item.count === 0 || item.summ === 0) return null;
    return Math.round(item.summ / item.count);
  });

  return averageData;
}
