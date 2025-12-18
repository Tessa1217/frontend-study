# Web API 학습 프로젝트

Web API의 동작 원리를 이해하고 실제 사용 사례를 구현한 학습 프로젝트입니다.

## 📚 학습한 Web API

### 1. [Timer API (setInterval, clearInterval)](./docs/timer.md)

**주요 내용**
- setInterval, clearInterval의 기본 사용법
- 타이머 정확도 측정 (`performance.now()`)
- Main Thread Blocking의 영향
- Canvas를 활용한 애니메이션 구현
- 클린업 패턴

**실습 예제**: 10개의 점을 1초 간격으로 연결하는 Canvas 애니메이션

**핵심 학습 포인트**
- JavaScript의 타이머는 정확한 시간을 보장하지 않음
- 무거운 동기 작업이 타이머 실행을 지연시킴
- 백그라운드 탭에서 throttling이 발생함 (1초 이상)
- 컴포넌트 언마운트 시 타이머 정리 필수

### 2. [Page Visibility API](./docs/page-visibility.md)

**주요 내용**
- `document.hidden`으로 탭 활성화 상태 확인
- `visibilitychange` 이벤트 핸들링
- 백그라운드 전환 시 시간 추적 및 보정
- 정확한 타이밍 제어 구현
- 다중 타이머 관리 패턴

**실습 예제**: 백그라운드 탭에서도 정확한 타이밍을 유지하는 Canvas 애니메이션

**핵심 학습 포인트**
- 탭 전환 시 경과 시간을 정확하게 계산하여 재개
- 리소스 최적화: 백그라운드에서 불필요한 작업 중단
- `setTimeout`과 `setInterval`을 조합한 정밀한 타이밍 제어
- 브라우저 throttling의 영향 최소화

## 🏗️ 프로젝트 구조

```
web-api/
├── src/
│   ├── pages/
│   │   ├── timer/              # Timer API 실습
│   │   │   └── index.tsx
│   │   └── page-visibility/    # Page Visibility API 실습
│   │       └── index.tsx
│   ├── routes.tsx              # 동적 라우팅 설정
│   ├── App.jsx                 # 메인 App 컴포넌트
│   └── main.jsx
├── docs/                       # API별 상세 문서
│   ├── timer.md
│   └── page-visibility.md
└── README.md
```

## 🎯 주요 개념 비교

### Timer API vs Page Visibility API

| 특징 | Timer API | Page Visibility API |
|------|-----------|-------------------|
| **목적** | 주기적인 작업 실행 | 탭 활성화 상태 감지 및 제어 |
| **백그라운드 동작** | Throttling 발생 (>1초) | 명시적 제어 가능 |
| **타이밍 정확도** | 보장되지 않음 | 정밀 제어 가능 |
| **구현 복잡도** | 간단 | 중간 (시간 추적 필요) |
| **리소스 사용** | 지속적 실행 | 최적화 가능 |
| **사용 시나리오** | 간단한 반복 작업 | 정확한 타이밍, 리소스 최적화 |

## 🚀 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 라우트

- `/timer` - Timer API 예제 (기본 setInterval)
- `/page-visibility` - Page Visibility API 예제 (정확한 타이밍 제어)

## 🛠️ 기술 스택

- **React 19.2**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **React Router v7**: 클라이언트 사이드 라우팅
- **Vite**: 빌드 도구
- **Canvas API**: 2D 그래픽 렌더링

## 📝 구현 특징

### 1. 동적 라우팅 시스템

```typescript
const pages = import.meta.glob("./pages/**/*.tsx");

export const routes = Object.keys(pages).map((path) => {
  const Component = React.lazy(pages[path]);
  return { path: pathToRoute(path), Component };
});
```

- Vite의 `import.meta.glob`을 활용한 파일 기반 라우팅
- React.lazy를 통한 코드 스플리팅
- 새로운 페이지 추가 시 라우팅 자동 설정

### 2. Canvas 렌더링 최적화

```typescript
const scaleFactor = window.devicePixelRatio || 1;
canvas.width = 1000 * scaleFactor;
canvas.height = 1000 * scaleFactor;
ctx.scale(scaleFactor, scaleFactor);
```

- `devicePixelRatio`를 활용한 고해상도 디스플레이 대응
- Retina 디스플레이에서도 선명한 렌더링

### 3. React Hooks 활용

- `useRef`: 리렌더링 없이 값 유지 (타이머 ID, 현재 인덱스)
- `useEffect`: 컴포넌트 라이프사이클에 맞춘 타이머 관리
- `useCallback`: 이벤트 핸들러 메모이제이션

## 🔍 상세 문서

각 API에 대한 자세한 내용은 `docs/` 디렉토리의 개별 문서를 참고하세요:

- [Timer API 상세 문서](./docs/timer.md)
- [Page Visibility API 상세 문서](./docs/page-visibility.md)

## 📖 학습 순서

1. **Timer API**
   - setInterval의 기본 동작 이해
   - 타이머의 한계점 경험 (throttling, blocking)
   
2. **Page Visibility API**
   - Timer API의 한계를 극복하는 방법
   - 정확한 타이밍 제어 구현
   - 실전 리소스 최적화 기법

## 🎓 핵심 인사이트

### 1. JavaScript는 싱글 스레드
- 모든 작업이 Event Loop를 통해 순차 실행
- 무거운 동기 작업이 타이머 실행을 지연시킴
- 해결: Web Workers, 비동기 처리

### 2. 브라우저 최적화 메커니즘
- 백그라운드 탭의 타이머는 최소 1초 간격으로 제한
- 배터리 수명과 성능을 위한 의도적 설계
- 해결: Page Visibility API로 명시적 제어

### 3. 정확한 타이밍이 필요한 경우
- setInterval만으로는 정밀한 제어 불가능
- 시간 추적 + 보정 로직 필요
- setTimeout과 setInterval 조합 활용

### 4. 리소스 관리의 중요성
- 타이머와 이벤트 리스너는 명시적 정리 필수
- 메모리 누수 방지
- 클린업 패턴 습관화

## 📚 참고 자료

- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [JavaScript Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event Loop](https://www.lydiahallie.com/blog/event-loop)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

**Last Updated**: 2024-12-17