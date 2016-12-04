module.exports = (summaries) => {
  let position = -3.0;
  const allocated = [];
  summaries.forEach((summary) => {
    allocated.push(position, summary.value / 100.0);
    position += 1.0;
  });
  return allocated;
};
