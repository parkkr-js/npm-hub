export interface PopularPackageInfo {
  name: string;
  description: string;
  score: {
    detail: {
      popularity: number;
    };
  };
  author: {
    name: string;
    email: string;
  };
  publisher: {
    username: string;
    email: string;
  };
}

export interface PackageInfo {
  package: {
    name: string;
    scope: 'unscoped' | string;
    version: string;
    description: string;
    keywords?: string[];
    date: string;
    links: {
      npm: string;
      homepage?: string;
      repository?: string;
      bugs?: string;
    };
    author: {
      name: string;
      email: string;
      username?: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    maintainers: Array<{
      username: string;
      email: string;
    }>;
  };
  flags: {
    insecure: number;
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}
