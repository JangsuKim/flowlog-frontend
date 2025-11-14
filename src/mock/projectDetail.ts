import type { ProjectDetail } from '../types/projectDetail';

export const mockProjectDetail: ProjectDetail = {
  id: 1,
  name: 'FlowLog プロジェクト管理',
  description: 'フローログのプロジェクト管理ページを開発するタスクです。',
  ownerName: 'Jangsoo',
  teamName: 'Backend',

  startDate: '2025-10-01',
  dueDate: '2025-12-19',

  progress: 50,
  status: 'IN_PROGRESS',

  // 🔥 프로젝트 태그 (기획 / 기술 / 릴리스 구분)
  tags: ['backend', 'dashboard', 'flowlog', 'release-1.0', 'planning'],

  tasks: [
    /* ------------------------------ */
    /*  BACKLOG (미대응)               */
    /* ------------------------------ */
    {
      id: 601,
      title: 'API 仕様書 작성',
      status: 'BACKLOG',
      assigneeName: 'JS',
      tags: ['documentation', 'api', 'spec'],
    },
    {
      id: 602,
      title: '프로젝트 설정 자동화 기능 검토',
      status: 'BACKLOG',
      assigneeName: 'JK',
      tags: ['automation', 'planning'],
    },

    /* ------------------------------ */
    /*  IN_PROGRESS (진행중)           */
    /* ------------------------------ */
    {
      id: 603,
      title: 'Kanban Board 基本 UI 구성',
      status: 'IN_PROGRESS',
      assigneeName: 'Leader_test',
      tags: ['frontend', 'kanban', 'ui'],
    },

    /* ------------------------------ */
    /*  BEFORE_REVIEW (리뷰전)         */
    /* ------------------------------ */
    {
      id: 604,
      title: 'Task Drawer 슬라이드 패널 구현',
      status: 'BEFORE_REVIEW',
      assigneeName: 'Jangsoo',
      tags: ['ui', 'frontend', 'drawer'],
    },

    /* ------------------------------ */
    /*  IN_REVIEW (리뷰중)             */
    /* ------------------------------ */
    {
      id: 605,
      title: 'Task 타입 & 구조 設計',
      status: 'IN_REVIEW',
      assigneeName: 'Leader_test',
      tags: ['planning', 'typescript', 'architecture'],
    },

    /* ------------------------------ */
    /*  PENDING (보류)                 */
    /* ------------------------------ */
    {
      id: 606,
      title: '프로젝트 초반 기획 내용 재검토',
      status: 'PENDING',
      assigneeName: 'Jangsoo',
      tags: ['planning', 'pending'],
    },

    /* ------------------------------ */
    /*  PRE_RELEASE (릴리스 전)        */
    /* ------------------------------ */
    {
      id: 607,
      title: '프로젝트 헤더 UI 개선 마지막 체크',
      status: 'PRE_RELEASE',
      assigneeName: 'Jangsoo',
      tags: ['ui', 'frontend', 'release'],
    },

    /* ------------------------------ */
    /*  DONE (완료)                    */
    /* ------------------------------ */
    {
      id: 608,
      title: 'プロジェクトヘッダー UI 구성 완료',
      status: 'DONE',
      assigneeName: 'Jangsoo',
      tags: ['ui', 'frontend'],
    },
  ],
};
