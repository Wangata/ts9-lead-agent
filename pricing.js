function calculateEstimate(projectSize) {
  if (!projectSize || isNaN(projectSize)) return 0;

  const rate = 0.45;
  return Math.round(projectSize * rate);
}

function getSizeTag(projectSize) {
  if (projectSize >= 5000) return "5000+ sqft";
  if (projectSize >= 2000) return "2000-5000 sqft";
  return "0-2000 sqft";
}

module.exports = { calculateEstimate, getSizeTag };
