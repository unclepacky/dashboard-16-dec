export const unitFilterQuery = (query: string) => ({
  name: {
    contains: query,
    mode: 'insensitive',
  },
});
