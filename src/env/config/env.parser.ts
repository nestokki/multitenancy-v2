export function getRequiredEnvString(key: string): string {
  const value = process.env[key];

  if (value === undefined || value.trim() === '') {
    throw new Error(`[ENV] ${key}가 누락되었거나 비어 있습니다.`);
  }

  return value;
}

export function getRequiredTrimmedEnvString(key: string): string {
  return getRequiredEnvString(key).trim();
}

export function getRequiredEnvNumber(key: string): number {
  const value = getRequiredEnvString(key);
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    throw new Error(`[ENV] ${key}는 숫자여야 합니다.`);
  }

  return numericValue;
}
