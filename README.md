# AI 기반 도서관리 시스템

**KT AIVLE School | AI 트랙 미니프로젝트 4차**

React와 json-server를 활용하여 도서 정보를 관리하고, OpenAI GPT Image API를 통해 도서 내용에 어울리는 표지 이미지를 생성하는 웹 애플리케이션입니다.

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | AI 표지 생성을 지원하는 도서관리시스템 |
| 프로젝트 유형 | Frontend 웹 애플리케이션 |
| 개발 방식 | 조별 협업 |
| 프로젝트 기간 | 3일 |
| 주요 기능 | 도서 CRUD 및 AI 표지 이미지 생성 |
| 데이터 관리 | json-server |
| 협업 도구 | GitHub |

### 프로젝트 목표

- 도서 목록 및 상세 정보를 조회할 수 있는 웹 애플리케이션 구현
- 도서 등록, 수정, 삭제 기능 구현
- OpenAI API를 활용한 도서 표지 이미지 생성
- 생성한 이미지의 저장 및 화면 반영
- React 컴포넌트 기반의 UI 구성
- GitHub를 활용한 팀 협업

## 2. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React 19, Vite |
| Language | JavaScript, HTML, CSS |
| 상태 관리 | React useState, useEffect |
| API 통신 | fetch |
| 데이터 서버 | json-server |
| AI 이미지 생성 | OpenAI GPT Image API |
| 협업 | Git, GitHub |

별도의 백엔드 서버 대신 json-server를 사용하여 REST API 환경을 구성합니다.

## 3. 서비스 구성도

### 도서 CRUD 처리

```text
[React 웹 애플리케이션]
          |
          | fetch
          | GET / POST / PATCH / DELETE
          v
[json-server : localhost:3000]
          |
          v
       [db.json]
```

### AI 도서 표지 생성

```text
[React 웹 애플리케이션]
          |
          | 도서 제목 및 내용으로 Prompt 생성
          v
    [OpenAI API]
          |
          | 이미지 생성 응답 (b64_json)
          v
  [React에서 Data URL 변환]
          |
          | PATCH /books/:id
          v
     [json-server]
          |
          v
[db.json의 coverImageUrl 저장]
```

## 4. 주요 기능

### 필수 기능

| 기능 | 설명 | 진행 상태 |
|---|---|---|
| 도서 목록 조회 | 등록된 도서 목록 확인 | 구현 예정 |
| 도서 상세 조회 | 선택한 도서의 상세 정보 확인 | 구현 예정 |
| 도서 등록 | 새로운 도서 정보 입력 및 저장 | 구현 예정 |
| 도서 수정 | 기존 도서 정보 수정 | 구현 예정 |
| 도서 삭제 | 선택한 도서 삭제 | 구현 예정 |
| AI 표지 생성 | 도서 내용 기반 AI 표지 생성 | 구현 예정 |
| 표지 저장 | 생성된 이미지를 도서 정보에 저장 | 구현 예정 |

### 추가 기능 제안

1. **AI 이미지 생성 이력**
   - 이미지 재생성 시 기존 이미지를 삭제하지 않고 생성 이력 보관
   - 사용자가 기존 생성 이미지 중 하나를 선택할 수 있도록 구성

2. **표지 이미지 선택**
   - 처음 이미지 생성 시 3장의 이미지를 생성
   - 사용자가 원하는 표지 이미지를 선택하여 적용

## 5. 프로젝트 실행 방법

### 5.1 개발 환경

- Node.js
- npm
- VS Code
- Git

### 5.2 프로젝트 다운로드

```bash
git clone https://github.com/gksgPDnjs/aivle-book-manager.git
cd aivle-book-manager
```

※ Private 저장소이므로 GitHub 접근 권한이 필요합니다.

### 5.3 패키지 설치

```bash
npm install
```

### 5.4 json-server 설치 및 실행

미니프로젝트 교안에서 안내한 전역 설치 방식입니다.

```bash
npm install -g json-server
```

프로젝트 루트에 `db.json` 파일이 있는지 확인한 후 다음 명령어를 실행합니다.

**터미널 1**

```bash
json-server --watch db.json --port 3000
```

실행 주소:

http://localhost:3000/books

### 5.5 React 개발 서버 실행

**터미널 2**

```bash
npm run dev
```

실행 주소:

http://localhost:5173

※ React와 json-server는 각각 별도의 터미널에서 실행합니다.

## 6. 데이터 구조 설계

도서 데이터는 프로젝트 루트의 `db.json` 파일에서 관리합니다.

### db.json 구조 예시

```json
{
  "books": [
    {
      "id": 1,
      "title": "별빛 아래의 서점",
      "author": "홍길동",
      "content": "작은 서점에서 벌어지는 이야기",
      "coverImageUrl": "",
      "createdAt": "2026-11-20T09:00:00.000Z",
      "updatedAt": "2026-11-20T09:00:00.000Z"
    }
  ]
}
```

### 데이터 필드 정의

| 필드명 | 타입 | 설명 |
|---|---|---|
| id | Number | 도서 고유 식별자 |
| title | String | 도서 제목 |
| author | String | 저자 |
| content | String | 도서 내용 |
| coverImageUrl | String | AI 생성 표지 이미지 Data URL |
| createdAt | String | 도서 등록 일시 |
| updatedAt | String | 도서 수정 일시 |

- `id`는 도서를 구분하기 위한 고유 값입니다.
- `coverImageUrl`은 최초 등록 시 빈 문자열로 설정할 수 있습니다.
- `createdAt`, `updatedAt`은 날짜 및 시간 문자열로 관리합니다.
- 도서 표지 생성 후 `coverImageUrl` 필드를 갱신합니다.

## 7. CRUD API 설계

**Base URL:** `http://localhost:3000`

| 기능 | HTTP Method | Endpoint | 설명 |
|---|---|---|---|
| 도서 목록 조회 | GET | `/books` | 등록된 전체 도서 조회 |
| 도서 상세 조회 | GET | `/books/:id` | 선택한 도서 상세 정보 조회 |
| 도서 등록 | POST | `/books` | 새로운 도서 정보 등록 |
| 도서 수정 | PATCH | `/books/:id` | 기존 도서 정보 수정 |
| 도서 삭제 | DELETE | `/books/:id` | 선택한 도서 삭제 |
| AI 표지 저장 | PATCH | `/books/:id` | 생성된 표지 이미지 저장 |

### API 동작 방식

**GET — 도서 조회**

json-server에서 도서 목록 또는 특정 도서 정보를 가져옵니다.

**POST — 도서 등록**

사용자가 입력한 도서 정보를 서버에 저장합니다.

**PATCH — 도서 수정**

기존 도서의 일부 정보를 변경합니다.

**DELETE — 도서 삭제**

선택한 도서 데이터를 삭제합니다.

**PATCH — AI 표지 저장**

OpenAI API를 통해 생성한 이미지를 Data URL로 변환한 뒤, 해당 도서의 `coverImageUrl` 필드를 업데이트합니다.

## 8. UI 화면 구성

| 화면 | 주요 내용 |
|---|---|
| 도서 목록 | 등록된 도서 목록 표시 |
| 도서 상세 | 도서 제목, 저자, 내용, 표지, 등록일 및 수정일 |
| 도서 등록 | 새로운 도서 정보 입력 |
| 도서 수정 | 기존 정보 불러오기 및 수정 |
| AI 표지 생성 영역 | 이미지 생성 옵션, 미리보기 및 저장 |

### 컴포넌트 구성

- 공통 헤더 및 레이아웃
- 도서 목록 컴포넌트
- 도서 상세 컴포넌트
- 도서 등록 및 수정 폼
- AI 표지 이미지 생성 영역

※ 구체적인 컴포넌트 분리 방식과 디자인은 UI 담당자와 협의 후 확정합니다.

## 9. 팀원별 R&R

| 담당자 | 운영 역할 | 기술 역할 |
|---|---|---|
| 배준현 | 조장 | PM·기획 |
| 이한웅 | 발표자 | 발표·문서 |
| 김지형 | 서기 | OpenAI 연동 |
| 유찬솔 | PPT 제작자 | UI·레이아웃 |
| 심규현 | 검토 담당자 | CRUD 연동 |
| 한혜원 | 타임키퍼 | 스타일링·QA |