const STITCH_API_KEY = process.env.EXPO_PUBLIC_STITCH_API_KEY;
const STITCH_PROJECT_ID = process.env.EXPO_PUBLIC_STITCH_PROJECT_ID;

export type StitchConfig = {
  apiKey?: string;
  projectId?: string;
  isConfigured: boolean;
  missingKeys: string[];
};

export function getStitchConfig(): StitchConfig {
  const requiredKeys: [string, string | undefined][] = [
    ['EXPO_PUBLIC_STITCH_API_KEY', STITCH_API_KEY],
    ['EXPO_PUBLIC_STITCH_PROJECT_ID', STITCH_PROJECT_ID],
  ];

  const missingKeys = requiredKeys.filter(([, value]) => !value).map(([key]) => key);

  return {
    apiKey: STITCH_API_KEY,
    projectId: STITCH_PROJECT_ID,
    isConfigured: missingKeys.length === 0,
    missingKeys,
  };
}

export function assertStitchConfigured(): Required<Pick<StitchConfig, 'apiKey' | 'projectId'>> {
  const config = getStitchConfig();

  if (!config.isConfigured || !config.apiKey || !config.projectId) {
    throw new Error(`Google Stitch is not configured. Missing: ${config.missingKeys.join(', ')}`);
  }

  return {
    apiKey: config.apiKey,
    projectId: config.projectId,
  };
}
