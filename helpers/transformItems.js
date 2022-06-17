export default (data) => {
  const locationId = data.reduce((acc, cur) => {
    if (!acc[`${cur.location}|${cur.device_id}`]) {
      acc[`${cur.location}|${cur.device_id}`] = [];
    }
    acc[`${cur.location}|${cur.device_id}`].push(cur);
    return acc;
  }, {});

  return locationId;
}

