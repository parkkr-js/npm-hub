import axios from 'axios';

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
    name: string;
    email: string;
  };
}

export interface PackageDetails {
  name: string;
  version: string;
  description: string;
  keywords: string[];
  links: {
    npm: string;
    homepage?: string;
    repository?: { type: string; url: string };
  };
  author?: {
    name: string;
    email: string;
  };
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
}

export const getPackageDetails = async (
  packageName: string,
): Promise<PackageDetails> => {
  const detailsURL = `https://registry.npmjs.org/${packageName}`;
  const response = await axios.get(detailsURL);
  const { data } = response;

  // 최신 버전 확인
  const latestVersion = data['dist-tags']?.latest;
  const latestVersionData = data.versions[latestVersion];

  // 최신 버전에 정보가 없으면 다른 버전에서 찾기
  const findFallbackValue = (field: string) => Object.values(data.versions)
    .map((version) => version[field])
    .find((value) => value !== undefined);

  return {
    name: data.name,
    version: latestVersion || 'N/A',
    description: data.description || findFallbackValue('description') || 'N/A',
    keywords: data.keywords || [],
    links: {
      npm: `https://www.npmjs.com/package/${data.name}`,
      homepage: data.homepage || findFallbackValue('homepage'),
      repository: latestVersionData.repository
        ? { type: latestVersionData.repository.type, url: latestVersionData.repository.url }
        : findFallbackValue('repository'),
    },
    author: latestVersionData.author || findFallbackValue('author'),
    dependencies: latestVersionData.dependencies || findFallbackValue('dependencies') || {},
    devDependencies: latestVersionData.devDependencies || findFallbackValue('devDependencies') || {},
    scripts: latestVersionData.scripts || findFallbackValue('scripts') || {},
    maintainers: data.maintainers?.map((maintainer: any) => ({
      name: maintainer.name,
      email: maintainer.email,
    })) || [],
    readme: data.readme || findFallbackValue('readme'),
    license: latestVersionData.license || findFallbackValue('license'),
    engines: latestVersionData.engines || findFallbackValue('engines') || {},
    bin: latestVersionData.bin || findFallbackValue('bin') || {},
    dist: latestVersionData.dist || findFallbackValue('dist') || { tarball: '', shasum: '' },
    deprecated: latestVersionData.deprecated || findFallbackValue('deprecated'),
    peerDependencies: latestVersionData.peerDependencies || findFallbackValue('peerDependencies') || {},
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
