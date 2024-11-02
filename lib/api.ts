// lib/api.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_NPM_API_URL;

export interface PackageData {
  name: string;
  version: string;
  description: string;
  keywords: string[];
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
  };
  author?: {
    username: string;
    email: string;
  };
}

export interface SearchResponse {
  objects: { package: PackageData }[];
  total: number;
  time: string;
}

// 검색 API 요청 함수
export const searchPackages = async (
  query: string,
  size: number = 20,
  from: number = 0,
): Promise<SearchResponse> => {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined");
    }
    const response = await axios.get<SearchResponse>(API_URL, {
      params: {
        text: query,
        size,
        from,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    throw error;
  }
};
