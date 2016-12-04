module.exports = (summaries) => {
  let position = -200.0;
  const allocated = [];
  summaries.forEach((summary) => {
    allocated.push(position, -summary.value / 3000.0);
    position += 50.0;
  });
  return allocated;
};
