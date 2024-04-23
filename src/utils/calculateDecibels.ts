function calculateDecibels(input: Float32Array): number {
  const meanSquare = input.reduce((sum, value) => sum + value ** 2, 0);
  const rootMeanSquare = Math.sqrt(meanSquare / input.length);
  const decibels = 20 * Math.log10(rootMeanSquare);

  return decibels;
}

export default calculateDecibels;
