export type Show = {
  id: number;
  name: string;
  image: {
    medium: string | null;
    original: string | null;
  } | null;
  rating: {
    average: number | null;
  } | null;
  genres: string[];
  summary: string | null;
};

export type TVMazeSearchResponse = Show[];
