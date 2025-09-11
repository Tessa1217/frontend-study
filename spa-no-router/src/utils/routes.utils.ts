import type { MatchResult } from "@/types";

/**
 * URL 패턴과 실제 경로를 비교하여 path parameter를 추출
 * @param patternSegments 경로 패턴 segment
 * @param pathSegments 실제 경로 segment
 * @returns 파라미터 객체
 */
export function extractParams(
  patternSegments: string[],
  pathSegments: string[]
): Record<string, string> | null {
  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const pattern = patternSegments[i];
    const segment = pathSegments[i];
    if (!segment) return null;
    if (pattern.startsWith(":")) {
      params[pattern.slice(1)] = segment;
    } else if (pattern !== segment) {
      return null;
    }
  }
  return params;
}

/**
 * 주어진 path 패턴 segment가 현재 경로 segment와 일치하는지 여부 판별
 * @param patternSegments path 패턴 segment
 * @param pathSegments 실제 패스 segment
 * @param isIndexRoute index 라우트 여부
 * @returns 파라미터 정보와 현재 패턴에서 처리된 경로 길이
 */
export function matchRoutePath(
  patternSegments: string[],
  pathSegments: string[],
  isIndexRoute: boolean
): MatchResult | null {
  if (isIndexRoute) {
    return pathSegments.length === 0
      ? {
          params: {},
          consumed: 0,
        }
      : null;
  }
  // 경로 길이 짧을 경우
  if (pathSegments.length < patternSegments.length) {
    return null;
  }

  const params = extractParams(patternSegments, pathSegments);

  return params !== null ? { params, consumed: patternSegments.length } : null;
}

/**
 * 주어진 경로 문자열을 경로 segment 배열로 변환
 * @param path 경로
 * @returns 구분자(/) 기준으로 분절된 경로 segment
 */
export function parsePathSegments(path: string): string[] {
  return path.split("/").filter(Boolean);
}
