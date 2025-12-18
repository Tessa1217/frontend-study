# Page Visibility API

## 개요

Page Visibility API는 사용자가 현재 페이지를 보고 있는지 (활성 탭인지) 여부를 감지할 수 있는 Web API입니다. 이를 통해 백그라운드에서 불필요한 작업을 중단하고, 리소스를 절약할 수 있습니다.

## 주요 개념

### document.hidden

```javascript
const isHidden = document.hidden; // boolean
```

- 페이지가 숨겨져 있는지 (백그라운드 탭인지) 여부를 반환
- `true`: 백그라운드 탭 (비활성)
- `false`: 활성 탭

### visibilitychange 이벤트

```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 페이지가 백그라운드로 전환됨
  } else {
    // 페이지가 다시 활성화됨
  }
});
```

- 탭의 가시성 상태가 변경될 때 발생하는 이벤트
- 사용자가 다른 탭으로 전환하거나 다시 돌아올 때 트리거

## 실습 예제: 정확한 타이머 제어

### 구현 내용

Page Visibility API를 활용하여 백그라운드 탭에서도 정확한 애니메이션 타이밍 유지

```typescript
const handleVisibleChange = () => {
  // 페이지 비활성화 시
  if (document.hidden) {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    
    const elapsed = Date.now() - lastVisibleTime.current;
    remainingTime.current = Math.max(remainingTime.current - elapsed, 0);
    console.log(`잔여 시간: ${remainingTime.current}ms`);
  } else {
    // 다시 활성화 시
    lastVisibleTime.current = Date.now();
    remainingIntervalId.current = setTimeout(() => {
      drawNextLine(ctx);
      intervalId.current = setInterval(() => drawNextLine(ctx), 1000);
    }, remainingTime.current);
  }
};

document.addEventListener('visibilitychange', handleVisibleChange);
```

### 주요 학습 포인트

#### 1. 시간 추적 (Time Tracking)

```typescript
const remainingTime = useRef<number>(0);
const lastVisibleTime = useRef<number>(Date.now());

// 선 그리기 완료 시
drawNextLine(ctx);
remainingTime.current = 1000; // 다음 실행까지 1초
lastVisibleTime.current = Date.now();
```

- `remainingTime`: 다음 작업까지 남은 시간
- `lastVisibleTime`: 마지막으로 페이지가 활성화된 시간
- 이 두 값을 조합하여 정확한 타이밍 계산

#### 2. 백그라운드 전환 시 처리

```typescript
if (document.hidden) {
  // 진행 중인 모든 타이머 정리
  if (intervalId.current) {
    clearInterval(intervalId.current);
    intervalId.current = null;
  }
  if (remainingIntervalId.current) {
    clearTimeout(remainingIntervalId.current);
    remainingIntervalId.current = null;
  }
  
  // 경과 시간 계산 및 잔여 시간 업데이트
  const elapsed = Date.now() - lastVisibleTime.current;
  remainingTime.current = Math.max(remainingTime.current - elapsed, 0);
}
```

- 모든 활성 타이머를 정리하여 리소스 절약
- 경과 시간을 계산하여 정확한 잔여 시간 유지
- `Math.max(..., 0)`로 음수 방지

#### 3. 다시 활성화 시 처리

```typescript
else {
  lastVisibleTime.current = Date.now();
  
  // 잔여 시간 후에 작업 재개
  remainingIntervalId.current = setTimeout(() => {
    drawNextLine(ctx);
    
    // 정규 interval 재시작
    if (!intervalId.current) {
      intervalId.current = setInterval(() => drawNextLine(ctx), 1000);
    }
  }, remainingTime.current);
}
```

- `setTimeout`으로 정확한 잔여 시간 후 재개
- 이후 다시 `setInterval`로 정규 간격 실행
- 타이밍이 누적되지 않도록 정밀하게 제어

#### 4. 다중 타이머 관리

```typescript
const intervalId = useRef<number | null>(null);        // 정규 interval
const remainingIntervalId = useRef<number | null>(null); // 재개용 timeout

// cleanup
return () => {
  if (intervalId.current) {
    clearInterval(intervalId.current);
  }
  if (remainingIntervalId.current) {
    clearTimeout(remainingIntervalId.current);
  }
  document.removeEventListener('visibilitychange', handleVisibleChange);
};
```

- 두 가지 타이머를 별도로 관리
- 컴포넌트 언마운트 시 모든 타이머와 이벤트 리스너 정리

## 시나리오별 동작 방식

### 시나리오 1: 정상 실행 중 백그라운드 전환

```
1. [활성] 선 그리기 완료 → remainingTime = 1000ms, lastVisibleTime 기록
2. [활성] 500ms 경과
3. [백그라운드 전환] elapsed = 500ms
   → remainingTime = 1000 - 500 = 500ms
4. [백그라운드] 타이머 모두 정리
```

### 시나리오 2: 백그라운드에서 다시 활성화

```
1. [활성화] lastVisibleTime 업데이트
2. [활성화] setTimeout(500ms) 설정 → 정확히 500ms 후 재개
3. [실행] 선 그리기 → setInterval(1000ms) 재시작
```

### 시나리오 3: 애니메이션 완료 상태에서 전환

```
1. [완료] intervalId === null
2. [백그라운드 전환] 정리할 타이머 없음 → 안전
3. [활성화] currentIndex 확인 → 이미 완료 상태면 재시작 안 함
```

## Page Visibility API의 장점

### 1. 리소스 최적화
- 백그라운드에서 불필요한 작업 중단
- CPU, 배터리, 네트워크 리소스 절약

### 2. 정확한 타이밍 제어
- 브라우저의 throttling 영향 최소화
- 사용자 경험 일관성 유지

### 3. 사용자 프라이버시
- 사용자가 페이지를 보고 있을 때만 추적/분석 가능
- 불필요한 데이터 수집 방지

## 활용 사례

### 1. 비디오/오디오 재생
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    video.pause();
  } else {
    video.play();
  }
});
```

### 2. 애니메이션 제어
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(animate);
  }
});
```

### 3. 실시간 데이터 갱신
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(pollingId);
  } else {
    pollingId = setInterval(fetchData, 5000);
  }
});
```

### 4. 분석 추적
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    analytics.track('page_hidden', { duration: Date.now() - startTime });
  } else {
    startTime = Date.now();
    analytics.track('page_visible');
  }
});
```

## 브라우저 지원

- 모던 브라우저에서 완벽하게 지원
- IE 10+ 지원 (일부 prefix 필요)
- Mobile Safari, Chrome 모두 지원

## 주의사항

1. **이벤트 리스너 정리**: 컴포넌트 언마운트 시 반드시 제거
2. **타이머 정리**: 모든 활성 타이머를 명시적으로 정리
3. **경합 조건**: 여러 타이머가 동시에 실행될 수 있으므로 상태 관리 주의
4. **음수 방지**: 시간 계산 시 `Math.max(..., 0)` 사용

## Timer API와의 비교

| 구분 | Timer API (setInterval) | Page Visibility API |
|------|------------------------|-------------------|
| 백그라운드 동작 | Throttling 발생 (>1초) | 명시적으로 제어 가능 |
| 타이밍 정확도 | 보장 안 됨 | 정밀하게 제어 가능 |
| 리소스 사용 | 계속 실행 | 최적화 가능 |
| 구현 복잡도 | 간단 | 상대적으로 복잡 |

## 참고 자료

- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN: document.hidden](https://developer.mozilla.org/en-US/docs/Web/API/Document/hidden)
- [MDN: visibilitychange event](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event)