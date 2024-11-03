import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_NPM_API_URL;
const PACKAGE_URL = process.env.NEXT_PUBLIC_NPM_PACKAGE_URL;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // GitHub API 호출 시 필요할 수 있음

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
    name: string;
    email: string;
  };
}

export interface PackageDetails extends PackageData {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  maintainers?: { name: string; email: string }[];
  readme?: string;
  license?: string;
  engines?: Record<string, string>;
  bin?: Record<string, string>;
  dist?: {
    tarball: string;
    shasum: string;
  };
  deprecated?: string;
  peerDependencies?: Record<string, string>;
  github?: {
    stars: number;
    forks: number;
    issues: number;
    lastCommit: string;
  };
  stats?: {
    downloadsLastMonth?: number;
    bundleSize?: {
      size: number;
      gzip: number;
      dependencyCount: number;
    };
  };
}


// 각 API 소스별 데이터 fetcher 함수들
const fetchNpmRegistryData = async (packageName: string) => {
  try {
    const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
    return response.data;
  } catch (error) {
    console.error('[NPM Registry] Error:', error);
    return null;
  }
};

const fetchUnpkgData = async (packageName: string) => {
  try {
    // package.json 가져오기
    const packageJsonResponse = await axios.get(`https://unpkg.com/${packageName}/package.json`);
    const packageJson = packageJsonResponse.data;

    // README 가져오기
    let readme = '';
    try {
      const readmeResponse = await axios.get(`https://unpkg.com/${packageName}/README.md`);
      readme = readmeResponse.data;
    } catch {
      try {
        // 대문자 README.md가 없는 경우 소문자로 시도
        const readmeResponse = await axios.get(`https://unpkg.com/${packageName}/readme.md`);
        readme = readmeResponse.data;
      } catch {
        console.warn('[Unpkg] README not found');
      }
    }

    return {
      packageJson,
      readme
    };
  } catch (error) {
    console.error('[Unpkg] Error:', error);
    return null;
  }
};

// NPM API를 통한 다운로드 통계 가져오기
const fetchNpmStats = async (packageName: string) => {
  try {
    const response = await axios.get(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
    return response.data;
  } catch (error) {
    console.error('[NPM Stats] Error:', error);
    return null;
  }
};
// Bundlephobia API를 통한 번들 크기 정보 가져오기
const fetchBundleSize = async (packageName: string) => {
  try {
    const response = await axios.get(`https://bundlephobia.com/api/size?package=${packageName}`);
    return response.data;
  } catch (error) {
    console.error('[Bundlephobia] Error:', error);
    return null;
  }
};

// GitHub 관련 유틸리티 함수들을 api.ts 내부로 통합
const extractGitHubInfo = (repositoryUrl: string): { owner: string; repo: string } | null => {
  try {
    // GitHub URL 형식들 처리
    const githubUrlPatterns = [
      /github\.com[\/:]([^\/]+)\/([^\/\.]+)(\.git)?$/,  // HTTPS 또는 SSH URL
      /^([^\/]+)\/([^\/\.]+)$/  // 'owner/repo' 형식
    ];

    for (const pattern of githubUrlPatterns) {
      const match = repositoryUrl.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace('.git', '')
        };
      }
    }
    return null;
  } catch {
    return null;
  }
};

const fetchGitHubData = async (repositoryUrl: string): Promise<PackageDetails['github'] | null> => {
  try {
    const repoInfo = extractGitHubInfo(repositoryUrl);
    if (!repoInfo) {
      console.warn('[GitHub] Invalid repository URL:', repositoryUrl);
      return null;
    }

    const { owner, repo } = repoInfo;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };

    // GitHub 토큰 확인
    if (!GITHUB_TOKEN) {
      console.error('[GitHub] No token found in environment variables');
      return null;
    }

    headers['Authorization'] = `token ${GITHUB_TOKEN}`; // 'Bearer' 대신 'token' 사용

    console.log('[GitHub] Making request with headers:', {
      ...headers,
      Authorization: headers.Authorization ? 'token [REDACTED]' : undefined
    });

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { 
        headers,
        // 디버깅을 위한 추가 설정
        validateStatus: (status) => {
          console.log('[GitHub] Response status:', status);
          return status >= 200 && status < 300;
        }
      }
    );

    return {
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      issues: response.data.open_issues_count,
      lastCommit: response.data.pushed_at
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[GitHub] Error response:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }
    return null;
  }
};

export const getPackageDetails =  async (
  packageName: string,
): Promise<PackageDetails> => {
  // 모든 데이터 소스에서 병렬로 데이터 가져오기
  const [
    npmData,
    unpkgData,
    npmStats,
    bundleSize,
  ] = await Promise.allSettled([
    fetchNpmRegistryData(packageName),
    fetchUnpkgData(packageName),
    fetchNpmStats(packageName),
    fetchBundleSize(packageName),
  ]);

  // NPM Registry 데이터 처리
  const registryData = npmData.status === 'fulfilled' ? npmData.value : null;
  if (!registryData) {
    throw new Error('Failed to fetch package data from NPM Registry');
  }

  // 최신 버전 확인
  const latestVersion = registryData['dist-tags']?.latest;
  const latestVersionData = registryData.versions[latestVersion];


 // Unpkg 데이터로 부족한 정보 보완
 const unpkgPackageJson = unpkgData.status === 'fulfilled' ? unpkgData.value?.packageJson : null;
 const readme = unpkgData.status === 'fulfilled' ? unpkgData.value?.readme : null;

 // GitHub 데이터 가져오기
 let githubData = null;
 if (latestVersionData.repository?.url) {
   try {
     githubData = await fetchGitHubData(latestVersionData.repository.url);
   } catch (error) {
     console.error('[GitHub] API request failed:', error);
   }
 }

 // NPM 통계 데이터
 const downloadsLastMonth = npmStats.status === 'fulfilled' ? npmStats.value?.downloads : null;

 // Bundlephobia 데이터
 const bundleData = bundleSize.status === 'fulfilled' ? bundleSize.value : null;

 return {
  name: registryData.name,
  version: latestVersion,
  description: latestVersionData.description || unpkgPackageJson?.description || 'N/A',
  keywords: latestVersionData.keywords || unpkgPackageJson?.keywords || [],
  links: {
    npm: `${PACKAGE_URL}${registryData.name}`,
    homepage: latestVersionData.homepage || unpkgPackageJson?.homepage,
    repository: latestVersionData.repository || unpkgPackageJson?.repository,
  },
  author: latestVersionData.author || unpkgPackageJson?.author,
  // scripts는 npm registry에서 제공하지 않는 경우 unpkg의 package.json에서 가져옴
  scripts: latestVersionData.scripts || unpkgPackageJson?.scripts || {},
  dependencies: latestVersionData.dependencies || unpkgPackageJson?.dependencies || {},
  devDependencies: latestVersionData.devDependencies || unpkgPackageJson?.devDependencies || {},
  maintainers: registryData.maintainers?.map((maintainer: any) => ({
    name: maintainer.name,
    email: maintainer.email,
  })) || [],
  // README는 npm registry에 없으면 unpkg에서 가져옴
  readme: registryData.readme || readme || '',
  license: latestVersionData.license || unpkgPackageJson?.license,
  engines: latestVersionData.engines || unpkgPackageJson?.engines || {},
  bin: latestVersionData.bin || unpkgPackageJson?.bin || {},
  dist: latestVersionData.dist || {},
  deprecated: latestVersionData.deprecated,
  peerDependencies: latestVersionData.peerDependencies || unpkgPackageJson?.peerDependencies || {},
  github: githubData,
  // 추가 정보
  stats: {
    downloadsLastMonth,
    bundleSize: bundleData ? {
      size: bundleData.size,
      gzip: bundleData.gzip,
      dependencyCount: bundleData.dependencyCount,
    } : null,
  },
};
};


export const searchPackages = async (
  query: string,
  size: number = 20,
  from: number = 0,
): Promise<{ objects: { package: PackageData }[] }> => {
  if (!API_URL) {
    console.error('API_URL is not defined');
    throw new Error('API_URL is not defined');
  }

  try {
    const response = await axios.get(API_URL, {
      params: { text: query, size, from },
    });
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
