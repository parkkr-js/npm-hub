import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_NPM_API_URL;
const PACKAGE_URL = process.env.NEXT_PUBLIC_NPM_PACKAGE_URL;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // GitHub API 호출 시 필요할 수 있음
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const CUSTOM_SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_CUSTOM_SEARCH_ENGINE_ID;

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
  // 새로운 Google 관련 데이터 필드 추가
  googleTrends?: {
    interestOverTime: Array<{
      date: string;
      value: number;
    }>;
    relatedTopics: Array<{
      topic: string;
      score: number;
    }>;
  };
  googleSearch?: {
    tutorials: Array<{
      title: string;
      link: string;
      snippet: string;
    }>;
    discussions: Array<{
      title: string;
      link: string;
      snippet: string;
    }>;
  };
}

// 각 API 소스별 데이터 fetcher 함수들
const fetchNpmRegistryData = async (packageName: string) => {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/${packageName}`,
    );
    return response.data;
  } catch (error) {
    console.error('[NPM Registry] Error:', error);
    return null;
  }
};

const fetchUnpkgData = async (packageName: string) => {
  try {
    // package.json 가져오기
    const packageJsonResponse = await axios.get(
      `https://unpkg.com/${packageName}/package.json`,
    );
    const packageJson = packageJsonResponse.data;

    // README 가져오기
    let readme = '';
    try {
      const readmeResponse = await axios.get(
        `https://unpkg.com/${packageName}/README.md`,
      );
      readme = readmeResponse.data;
    } catch {
      try {
        // 대문자 README.md가 없는 경우 소문자로 시도
        const readmeResponse = await axios.get(
          `https://unpkg.com/${packageName}/readme.md`,
        );
        readme = readmeResponse.data;
      } catch {
        console.warn('[Unpkg] README not found');
      }
    }

    return {
      packageJson,
      readme,
    };
  } catch (error) {
    console.error('[Unpkg] Error:', error);
    return null;
  }
};

const fetchPackageScripts = async (
  packageName: string,
  repositoryUrl?: string,
) => {
  try {
    // 1. npm registry에서 시도
    const registryResponse = await fetchNpmRegistryData(packageName);
    if (registryResponse) {
      const latestVersion = registryResponse['dist-tags']?.latest;
      if (latestVersion && registryResponse.versions[latestVersion].scripts) {
        return registryResponse.versions[latestVersion].scripts;
      }
    }

    // 2. unpkg에서 시도
    const unpkgData = await fetchUnpkgData(packageName);
    if (unpkgData?.packageJson?.scripts) {
      return unpkgData.packageJson.scripts;
    }
    // 3. GitHub에서 시도 (repository URL이 있는 경우)
    if (repositoryUrl) {
      const githubInfo = extractGitHubInfo(repositoryUrl);
      if (githubInfo) {
        const { owner, repo } = githubInfo;
        const githubResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/package.json`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3.raw',
            },
          },
        );

        if (githubResponse.data?.scripts) {
          return githubResponse.data.scripts;
        }
      }
    }

    console.warn(
      `Warning: No scripts found for package ${packageName} in any source`,
    );
    return null;
  } catch (error) {
    console.error('[Package Scripts] Error fetching scripts:', error);
    return null;
  }
};

// NPM API를 통한 다운로드 통계 가져오기
const fetchNpmStats = async (packageName: string) => {
  try {
    const response = await axios.get(
      `https://api.npmjs.org/downloads/point/last-month/${packageName}`,
    );
    return response.data;
  } catch (error) {
    console.error('[NPM Stats] Error:', error);
    return null;
  }
};
// Bundlephobia API를 통한 번들 크기 정보 가져오기
const fetchBundleSize = async (packageName: string) => {
  try {
    const response = await axios.get(
      `https://bundlephobia.com/api/size?package=${packageName}`,
    );
    return response.data;
  } catch (error) {
    console.error('[Bundlephobia] Error:', error);
    return null;
  }
};

// GitHub 관련 유틸리티 함수들을 api.ts 내부로 통합
const extractGitHubInfo = (
  repositoryUrl: string,
): { owner: string; repo: string } | null => {
  try {
    // GitHub URL 형식들 처리
    const githubUrlPatterns = [
      /github\.com[\/:]([^\/]+)\/([^\/\.]+)(\.git)?$/, // HTTPS 또는 SSH URL
      /^([^\/]+)\/([^\/\.]+)$/, // 'owner/repo' 형식
    ];

    for (const pattern of githubUrlPatterns) {
      const match = repositoryUrl.match(pattern);
      if (match) {
        return {
          owner: match[1], // 저장소 소유자 (예: "facebook")
          repo: match[2].replace('.git', ''), // 저장소 이름 (예: "react")
        };
      }
    }
    return null;
  } catch {
    return null;
  }
};

const fetchGitHubData = async (
  repositoryUrl: string,
): Promise<PackageDetails['github'] | null> => {
  try {
    // URL에서 소유자와 저장소 정보 추출
    const repoInfo = extractGitHubInfo(repositoryUrl);
    if (!repoInfo) {
      console.warn('[GitHub] Invalid repository URL:', repositoryUrl);
      return null;
    }

    const { owner, repo } = repoInfo;
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    // GitHub 토큰 확인
    if (!GITHUB_TOKEN) {
      console.error('[GitHub] No token found in environment variables');
      return null;
    }

    // GitHub API 요청 헤더 설정
    headers['Authorization'] = `token ${GITHUB_TOKEN}`; // 'Bearer' 대신 'token' 사용

    console.log('[GitHub] Making request with headers:', {
      ...headers,
      Authorization: headers.Authorization ? 'token [REDACTED]' : undefined,
    });

    // GitHub API 호출
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        // 디버깅을 위한 추가 설정
        validateStatus: (status) => {
          console.log('[GitHub] Response status:', status);
          return status >= 200 && status < 300;
        },
      },
    );

    return {
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      issues: response.data.open_issues_count,
      lastCommit: response.data.pushed_at,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[GitHub] Error response:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    return null;
  }
};

// Google Trends API 호출 함수
const fetchGoogleTrends = async (packageName: string) => {
  try {
    // Google Trends API는 공식 Node.js 클라이언트를 통해 접근
    const response = await axios.get(
      `https://trends.google.com/trends/api/widgetdata/multiline`,
      {
        // 요청 파라미터 설정
        params: {
          hl: 'en-US', // 언어 설정 (영어)
          tz: -480, // 타임존 오프셋 (UTC-8)
          req: JSON.stringify({
            time: '1y', // 데이터 기간 (1년)
            keyword: [packageName], // 검색할 키워드
            geo: '', // 지역 필터 (빈 문자열은 전세계)
            property: 'npm', // 검색 속성 (npm 관련)
          }),
          token: GOOGLE_API_KEY, // API 인증 토큰
        },
      },
    );

    // Google Trends 데이터 파싱 및 정제
    const data = JSON.parse(response.data.slice(5)); // 앞의 ")]}'" 제거
    // 응답 데이터 처리
    return {
      // 시간별 관심도 데이터
      interestOverTime: data.default.timelineData.map((item: any) => ({
        date: item.formattedTime, // 날짜 형식화
        value: item.value[0], // 관심도 값
      })),

      // 연관 토픽 (상위 5개)
      relatedTopics:
        data.default.relatedTopics?.rankedList[0]?.rankedKeyword
          .slice(0, 5)
          .map((item: any) => ({
            topic: item.topic.title, // 토픽 제목
            score: item.value, // 연관도 점수
          })) || [],
    };
  } catch (error) {
    console.error('[Google Trends] Error:', error);
    return null;
  }
};

// Google Custom Search API 호출 함수
const fetchGoogleSearch = async (packageName: string) => {
  try {
    // 튜토리얼 검색
    const tutorialResponse = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          key: GOOGLE_API_KEY, // API 키
          cx: CUSTOM_SEARCH_ENGINE_ID, // 검색 엔진 ID
          q: `${packageName} npm tutorial OR guide`, // 검색어 (튜토리얼/가이드)
          num: 5, // 결과 수
        },
      },
    );

    // 토론/이슈 검색
    const discussionResponse = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        // 토론/이슈 검색 파라미터
        params: {
          key: GOOGLE_API_KEY,
          cx: CUSTOM_SEARCH_ENGINE_ID,
          q: `${packageName} npm discussion OR issues OR stackoverflow`, // 검색어 (토론/이슈)
          num: 5,
        },
      },
    );

    // 검색 결과 처리
    return {
      // 튜토리얼 검색 결과
      tutorials: tutorialResponse.data.items.map((item: any) => ({
        title: item.title, // 제목
        link: item.link, // URL
        snippet: item.snippet, // 내용 발췌
      })),

      // 토론 검색 결과
      discussions: discussionResponse.data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      })),
    };
  } catch (error) {
    console.error('[Google Search] Error:', error);
    return null;
  }
};

export const getPackageDetails = async (
  packageName: string,
): Promise<PackageDetails> => {
  // 모든 데이터 소스에서 병렬로 데이터 가져오기
  const [
    npmData,
    unpkgData,
    npmStats,
    bundleSize,
    googleTrendsData,
    googleSearchData,
  ] = await Promise.allSettled([
    fetchNpmRegistryData(packageName),
    fetchUnpkgData(packageName),
    fetchNpmStats(packageName),
    fetchBundleSize(packageName),
    fetchGoogleTrends(packageName),
    fetchGoogleSearch(packageName),
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
  const unpkgPackageJson =
    unpkgData.status === 'fulfilled' ? unpkgData.value?.packageJson : null;
  const readme =
    unpkgData.status === 'fulfilled' ? unpkgData.value?.readme : null;

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
  const downloadsLastMonth =
    npmStats.status === 'fulfilled' ? npmStats.value?.downloads : null;

  // Bundlephobia 데이터
  const bundleData =
    bundleSize.status === 'fulfilled' ? bundleSize.value : null;

  // scripts 가져오기 (모든 소스 시도)
  const scripts = await fetchPackageScripts(
    packageName,
    latestVersionData.repository?.url,
  );

  return {
    name: registryData.name,
    version: latestVersion,
    description:
      latestVersionData.description || unpkgPackageJson?.description || 'N/A',
    keywords: latestVersionData.keywords || unpkgPackageJson?.keywords || [],
    links: {
      npm: `${PACKAGE_URL}${registryData.name}`,
      homepage: latestVersionData.homepage || unpkgPackageJson?.homepage,
      repository: latestVersionData.repository || unpkgPackageJson?.repository,
    },
    author: latestVersionData.author || unpkgPackageJson?.author,
    // scripts는 npm registry에서 제공하지 않는 경우 unpkg의 package.json에서 가져옴
    scripts: scripts || {},
    dependencies:
      latestVersionData.dependencies || unpkgPackageJson?.dependencies || {},
    devDependencies:
      latestVersionData.devDependencies ||
      unpkgPackageJson?.devDependencies ||
      {},
    maintainers:
      registryData.maintainers?.map((maintainer: any) => ({
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
    peerDependencies:
      latestVersionData.peerDependencies ||
      unpkgPackageJson?.peerDependencies ||
      {},
    github: githubData,
    // 추가 정보
    stats: {
      downloadsLastMonth,
      bundleSize: bundleData
        ? {
            size: bundleData.size,
            gzip: bundleData.gzip,
            dependencyCount: bundleData.dependencyCount,
          }
        : null,
    },
    googleTrends:
      googleTrendsData.status === 'fulfilled' ? googleTrendsData.value : null,
    googleSearch:
      googleSearchData.status === 'fulfilled' ? googleSearchData.value : null,
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
