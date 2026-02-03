import { http } from "./http";
import type { TVMazeSearchResponse } from "../types/show";

export async function searchShows(query: string) {
  const res = await http.get<TVMazeSearchResponse>("/search/shows", {
    params: {
      q: query,
    },
  });

  return res.data.map((item) => item.show);
}
