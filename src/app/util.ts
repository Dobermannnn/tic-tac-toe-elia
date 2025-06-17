export const getDisplayText = (score: string): string =>
  score === 'tie' ? "It's a tie!" : `${score} Won!`;
