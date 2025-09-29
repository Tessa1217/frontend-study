# css-bench

React + Vite 환경에서 **CSS-in-JS (Styled-components)** 와 **Zero-runtime CSS-in-JS (Vanilla Extract)** 를 비교하기 위한 간단한 벤치마킹 프로젝트입니다.

---

## 📌 프로젝트 목적

- CSS-in-JS의 DX(Developer Experience) 장점과 런타임 오버헤드 한계를 직접 확인
- Zero-runtime CSS-in-JS가 어떤 점에서 성능적으로 개선되는지 검증
- React DevTools Profiler 지표(Flamegraph)를 활용해 렌더링 과정의 차이를 시각적으로 확인

---

## 🚀 실행 방법

### 1. 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173/) 접속.

### 3. 벤치마크 실행

- 화면에 표시된 버튼을 눌러 **Styled-components** 또는 **Vanilla Extract** 시나리오를 실행합니다.
- React DevTools Profiler를 열고 Flamegraph 및 렌더링 시간을 확인합니다.

<img width="1515" height="1001" alt="스크린샷 2025-09-30 011928" src="https://github.com/user-attachments/assets/8650afcf-f518-4fbd-906e-9c79e2620dbf" />


---

## 🔎 벤치마크 시나리오

- React + Vite 환경
- 3,000개의 Box 컴포넌트를 렌더링
- Props(`variant`, `bordered`, `shadowed`) 기반 스타일 적용
- **Styled-components vs. Vanilla Extract** 비교

---

## 📂 주요 코드 구조

```
src/
├── components
│   ├── StyledBoxes.tsx # Styled-components 케이스
│   ├── zero-runtime.css.ts # Vanilla Extract 스타일 정의
│   └── ZeroRuntimeBoxes.tsx # Vanilla Extract 케이스
└── App.tsx # 벤치마크 실행 UI
```

---

## 📊 결과

- Styled-components: **339.3ms**
- Vanilla Extract: **284.5ms**
- 약 **16% 성능 차이**
<img width="1584" height="235" alt="스크린샷 2025-09-30 012422" src="https://github.com/user-attachments/assets/b2e674de-17d4-423e-b5ef-54722f9f3f28" />
<img width="1603" height="239" alt="스크린샷 2025-09-30 012401" src="https://github.com/user-attachments/assets/c4cac7bd-b9c0-4632-8c13-cfc61a078e43" />



---

## 📝 결론

- **CSS-in-JS (Styled-components)**
  - 장점: 생산성, 직관적인 API, 풍부한 생태계
  - 단점: 런타임 성능 오버헤드, 캐싱 이점 부족
- **Zero-runtime CSS-in-JS (Vanilla Extract)**
  - 장점: 빌드 타임 className 확정 → 성능 개선, 디자인 토큰 시스템과 결합 용이
  - 단점: 학습 곡선, 상대적으로 작은 생태계

---

## 🔮 앞으로 확장 아이디어

- 테마 변경 시 성능 차이 비교
- SSR(Server-side Rendering) 환경에서의 스타일 처리 성능
- 모바일/저사양 디바이스에서의 체감 성능 검증
