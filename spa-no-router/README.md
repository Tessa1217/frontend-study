# React-Router 없이 SPA 구현하기

## 목표

- **클라이언트 사이드 라우팅** 직접 구현
- **3개 경로** 지원
  - / -> Home
  - /posts -> Posts 목록
  - /posts/:id -> Post 상세

## 환경 세팅

```
npm create vite@latest spa-no-router --template react-ts
cd spa-no-router
npm i
npm run dev
```

## 요구사항

### 각 페이지 구현

- /home
  - [x] posts 목록 보러가기 버튼
- /posts
  - [x] posts api 호출 시 목록 리스트로 나열
  - [x] posts 리스트 아이템 클릭 시 /posts/:id로 이동
  - [x] pagination - more button 활용
- /posts/:id
  - [x] posts/:id api 호출 시 아이템 세부 상태 viewing
  - [x] 뒤로가기

### 라우터 구현

- [x] browser routing
  - [x] window history 객체 등의 활용을 통한 (react-router를 사용하지 않은) 클라이언트 사이드 라우팅 구현
- [x] 라우팅 매칭 규칙
  - [x] /, /posts, /posts:id 외에는 404 페이지로 이동
- [x] 새로고침/직접접속 시에도 정상 동작 필요

### 링크(Link) 컴포넌트

- [x] <Link to="/posts">Posts</Link> 형태의 컴포넌트 직접 제작
- [x] 클릭 시 새로고침이 아닌 SPA 방식 화면만 변경 필요

### 데이터 패칭

- [x] Posts 페이지: GET /posts 호출
- [x] PostDetail 페이지: GET /posts/:id로 단건 데이터 표시.
  - 최소 필드: id, title, body.
- [x] (Option) 로딩/에러 상태를 명확히 표시:
  - 로딩: “Loading…”
  - 에러: “Something went wrong
