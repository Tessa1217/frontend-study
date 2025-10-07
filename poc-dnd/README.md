# 드래그 앤 드롭 UI 빌더 POC

이 프로젝트는 사용자가 컴포넌트를 드래그 앤 드롭하여 웹 UI 레이아웃을 구성할 수 있는 기술 검증(Proof-of-Concept) 프로젝트입니다. React, TypeScript, 그리고 `@dnd-kit` 라이브러리를 기반으로 제작되었습니다.

## ✨ 주요 기능

- **컴포넌트 팔레트**: 사용 가능한 UI 컴포넌트 목록이 사이드바에 표시되며, 이를 캔버스로 드래그할 수 있습니다.
- **드래그 앤 드롭 캔버스**: 팔레트의 컴포넌트를 메인 캔버스 영역으로 드래그하여 UI를 동적으로 구성할 수 있습니다.
- **중첩 구조**: 특정 컨테이너 컴포넌트는 다른 컴포넌트를 자식으로 가질 수 있어, 중첩된 레이아웃을 만들 수 있습니다.
- **재정렬**: 캔버스에 이미 배치된 컴포넌트들을 드래그하여 위치를 바꾸거나 순서를 재배치할 수 있습니다.
- **트리 기반 상태 관리**: 전체 UI 레이아웃은 트리(Tree) 자료구조로 관리되어 렌더링과 상태 변경이 용이합니다.

## 🛠️ 핵심 기술

- **React**: 핵심 UI 라이브러리
- **TypeScript**: 정적 타이핑을 통한 안정성 및 개발 경험 향상
- **@dnd-kit/core**: 가볍고 모듈화된 드래그 앤 드롭 인터페이스 구축 라이브러리
- **Vite**: 빠른 개발 서버 및 최적화된 빌드를 위한 개발 도구

## 📂 프로젝트 구조

주요 디렉토리 구조는 다음과 같습니다.

```
src/
├── components/
│   ├── atoms/          # 재사용 가능한 기본 UI 컴포넌트 (Button, Input 등)
│   └── draggable/      # 드래그 앤 드롭 기능과 관련된 컴포넌트
├── hooks/
│   └── useDragAndDropNode.tsx # 노드 트리 상태 관리를 위한 커스텀 훅
├── types.ts            # 핵심 `Node` 인터페이스 등 TypeScript 타입 정의
└── App.tsx             # DnD 컨텍스트를 설정하고 앱을 총괄하는 메인 컴포넌트
```

## ⚙️ 동작 방식

### 1. 데이터 표현
UI 레이아웃은 `src/types.ts`에 정의된 `Node` 객체들의 트리 구조로 표현됩니다. 각 노드는 고유 `id`, `type`(컴포넌트 종류), 그리고 자식 노드를 가질 수 있는지 여부를 나타내는 `acceptsChildren` 속성을 가집니다.

```typescript
// src/types.ts
export interface Node {
  id: string;
  type: ComponentType;
  acceptsChildren: boolean;
  children?: Node[];
}
```

### 2. 상태 관리
`useDragAndDropNode` 커스텀 훅(`src/hooks/useDragAndDropNode.tsx`)이 컴포넌트 트리의 상태를 관리합니다. 이 훅은 트리 구조를 변경하는 함수들을 제공합니다.
- `addNode`: 새로운 컴포넌트를 트리의 최상단 혹은 특정 부모 노드 내에 추가합니다.
- `moveNode`: 기존 컴포넌트를 트리 내의 다른 위치로 이동시킵니다.

### 3. 드래그 앤 드롭 로직
핵심적인 드래그 앤 드롭 로직은 `App.tsx`에서 `@dnd-kit`을 통해 관리됩니다.

1.  **`DndContext`**: 앱 전체를 감싸는 Provider로, 드래그 앤 드롭의 전반적인 상태를 관리합니다.
2.  **Draggable (드래그 가능한) 아이템**:
    - **팔레트**: `DraggableArea`는 `DraggableItem`으로 감싸진 컴포넌트 목록을 렌더링합니다. 팔레트에서 드래그되는 아이템은 ID에 `palette-` 접두사가 붙어 새로운 컴포넌트임을 식별합니다.
    - **캔버스**: 캔버스에 렌더링된 각 컴포넌트는 `DraggableNode`로 감싸져 이동이 가능해집니다.
3.  **Droppable (드롭 가능한) 영역**:
    - `RootDropZone`: 컴포넌트가 처음 드롭될 수 있는 메인 캔버스 영역입니다.
    - `DroppableArea`: 자식을 가질 수 있는 컴포넌트(`acceptsChildren: true`) 내부에 렌더링되어, 중첩된 드롭 영역을 생성합니다.
4.  **`onDragEnd` 핸들러**: 드래그 작업이 끝나면 `App.tsx`의 `handleDragEnd` 함수가 실행됩니다. 이 함수는 드래그된 아이템(`active`)과 드롭된 위치(`over`)를 분석하여 의도를 파악합니다.
    - 드래그된 아이템 ID가 `palette-`로 시작하면, 새로운 컴포넌트를 추가하는 것으로 간주하여 `addNode`를 호출합니다.
    - 그렇지 않으면, 기존 컴포넌트를 이동하는 것으로 간주하여 `moveNode`를 호출합니다.

## 🚀 시작하기

1.  **의존성 설치:**
    ```bash
    npm install
    ```

2.  **개발 서버 실행:**
    ```bash
    npm run dev
    ```

3.  브라우저에서 터미널에 표시된 주소(기본값: `http://localhost:5173`)로 접속합니다.