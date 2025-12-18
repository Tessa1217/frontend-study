# Timer API (setInterval, clearInterval)

## 개요

JavaScript의 `setInterval`과 `clearInterval`은 일정한 시간 간격으로 함수를 반복 실행할 수 있는 Timer API입니다.

## 주요 개념

### setInterval

```javascript
const intervalId = setInterval(callback, delay);
```

- **callback**: 반복 실행할 함수
- **delay**: 실행 간격 (밀리초)
- **반환값**: 타이머를 식별하는 ID (숫자)

### clearInterval

```javascript
clearInterval(intervalId);
```

- 진행 중인 타이머를 중단합니다.
- intervalId를 통해 특정 타이머를 식별합니다.

## 실습 예제: Canvas 애니메이션

### 구현 내용

10개의 점(A~J)을 1초 간격으로 연결하는 선 그리기 애니메이션

```typescript
const timer = setInterval(() => {
  const now = performance.now();
  const diff = now - lastTime.current;
  console.log(`Actual delay: ${diff.toFixed(2)}ms`);
  
  lastTime.current = now;
  heavyComputation(); // 무거운 연산 시뮬레이션
  
  // 선 그리기 로직
  drawLine(ctx, points[currentIndex.current], points[currentIndex.current + 1]);
  currentIndex.current++;
  
  if (currentIndex.current >= points.length - 1) {
    clearInterval(timer);
  }
}, 1000);
```

### 주요 학습 포인트

#### 1. 타이머 정확도 측정

```typescript
const lastTime = useRef<number | null>(null);
lastTime.current = performance.now();

// setInterval 콜백 내부
const now = performance.now();
const diff = now - lastTime.current;
console.log(`Actual delay: ${diff.toFixed(2)}ms`);
```

- `performance.now()`를 사용하여 실제 실행 간격 측정
- setInterval의 delay는 보장되지 않으며, 브라우저 상태에 따라 달라질 수 있음

#### 2. Main Thread Blocking

```typescript
const heavyComputation = () => {
  let sum = 0;
  for (let i = 0; i < 2e9; i++) {
    sum += 1;
  }
  return sum;
};
```

- 무거운 동기 작업은 메인 스레드를 블로킹합니다.
- 타이머의 정확도가 떨어지는 원인이 됩니다.
- 실제 지연 시간이 설정한 1000ms보다 훨씬 길어질 수 있습니다.

#### 3. Canvas 해상도 처리

```typescript
const scaleFactor = window.devicePixelRatio || 1;
canvas.width = 1000 * scaleFactor;
canvas.height = 1000 * scaleFactor;
ctx.scale(scaleFactor, scaleFactor);
```

- `devicePixelRatio`를 사용하여 고해상도 디스플레이 대응
- 물리적 픽셀과 CSS 픽셀의 차이를 보정

#### 4. 클린업 (Cleanup)

```typescript
useEffect(() => {
  const timer = setInterval(/* ... */, 1000);
  
  return () => {
    clearInterval(timer);
    currentIndex.current = 0;
  };
}, []);
```

- 컴포넌트 언마운트 시 타이머를 반드시 정리해야 합니다.
- 메모리 누수를 방지합니다.

## Timer API의 특징

### 장점
- 간단한 API로 반복 작업 구현 가능
- 브라우저에서 기본 제공하는 표준 API

### 단점
- 정확한 타이밍 보장 안 됨
- Main thread blocking 시 지연 발생
- 백그라운드 탭에서 throttling 발생 (1초 이상 간격으로 제한)
- 무거운 작업 시 UI가 멈출 수 있음

## 브라우저 동작 방식

1. **이벤트 루프**: JavaScript는 싱글 스레드이므로 모든 작업이 큐에 쌓여 순차 실행
2. **Throttling**: 백그라운드 탭의 경우 브라우저가 타이머를 느리게 실행 (배터리 절약)
3. **Main Thread**: 무거운 연산이 실행 중이면 다음 타이머 콜백이 지연됨

## 대안

- **requestAnimationFrame**: 화면 갱신에 동기화된 애니메이션
- **Web Workers**: 무거운 연산을 별도 스레드에서 실행
- **Page Visibility API**: 탭 활성화 상태에 따른 타이머 제어 (다음 문서 참조)

## 참고 자료

- [MDN: setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [MDN: clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [MDN: performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)