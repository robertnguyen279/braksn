export const stringQuery = (query: any): string => {
  let string = '';

  for (const item in query) {
    string += item + '=' + query[item] + '&';
  }

  return string;
};

export const useQuery = (params: any) => new URLSearchParams(params);
