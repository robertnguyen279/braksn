export const parseQueryText = (text: string) =>
  text.split('-').join(' ').toLowerCase();
