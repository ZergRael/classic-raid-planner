export function isPlayerNameValid(name) {
  return name && name.length > 1;
}

export function round(val, decPlaces) {
  const multiplier = Math.pow(10, decPlaces);
  return Math.round(val * multiplier) / multiplier;
}

export function intOrNull(val) {
  if (val == "null") {
    return null;
  }

  return parseInt(val);
}
