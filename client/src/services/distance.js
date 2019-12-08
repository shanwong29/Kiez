const distance = (coordinates1, coordinates2) => {
  let dx = 71.5 * (coordinates1.lng - coordinates2.lng);
  let dy = 111.3 * (coordinates1.lat - coordinates2.lat);
  return Math.sqrt(dx * dx + dy * dy).toFixed(1);
};

export { distance };

// // Example:
// distance(
//   { lat: 52.5023865, lng: 13.4062956 },
//   { lat: 52.503706, lng: 13.410135 }
// );
