// This function returns the nearest donor item to the given coordinates.
// It returns the item itself, not its index.
export function getNearest(list, latitude, longitude) {
  let minDist = 99999;
  let nearestItem = null;
  list.forEach((item) => {
    let dist = Math.sqrt(
      Math.pow(item.coords.latitude - latitude, 2) +
        Math.pow(item.coords.longitude - longitude, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearestItem = item;
    }
  });
  return nearestItem;
}

// Sort the donor locations by their distance to the given coordinates.
export function sortLocations(list, latitude, longitude) {
  list.sort((a, b) => {
    let distA = Math.sqrt(
      Math.pow(a.coords.latitude - latitude, 2) +
        Math.pow(a.coords.longitude - longitude, 2)
    );
    let distB = Math.sqrt(
      Math.pow(b.coords.latitude - latitude, 2) +
        Math.pow(b.coords.longitude - longitude, 2)
    );
    return distA - distB;
  });
}
