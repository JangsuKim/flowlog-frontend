// src/pages/ProjectDetail.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppLayout from '../layout/AppLayout';
import { getProjectById } from '../api/projects';
import type { ProjectDetail } from '../types/projectDetail';
import { mockProjectDetail } from '../mock/projectDetail';

import ProjectHeader from '../components/project-detail/ProjectHeader';
import KanbanBoard from '../components/project-detail/KanbanBoard';
import TaskDrawer from '../components/task-detail/TaskDrawer';

import type { Task } from '../types/task';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        const apiData = await getProjectById(Number(id));

        const merged: ProjectDetail = {
          ...apiData,
          startDate: apiData.startDate ?? null,
          dueDate: apiData.dueDate ?? null,
          description: apiData.description ?? null,
          tags: apiData.tags ?? [],
          tasks: mockProjectDetail.tasks,
        };

        setProject(merged);
      } catch (e) {
        setError('プロジェクトが見つかりません。' + e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <AppLayout>
      {loading && <p className='text-gray-500 text-sm p-6'>読み込み中...</p>}
      {!loading && error && <p className='text-red-500 text-sm p-6'>{error}</p>}

      {!loading && !error && project && (
        <div className='p-6 space-y-10'>
          <h1 className='text-3xl font-bold text-gray-800'>{project.name}</h1>
          <ProjectHeader project={project} />

          <KanbanBoard
            tasks={project.tasks}
            onAddTask={() =>
              setProject((prev) =>
                prev
                  ? {
                      ...prev,
                      tasks: [
                        {
                          id: Date.now(),
                          title: '新しいタスク',
                          status: 'BACKLOG',
                          assigneeName: 'Jangsoo',
                          description: '',
                          tags: [],
                        },
                        ...prev.tasks,
                      ],
                    }
                  : prev
              )
            }
            onUpdateTasks={(updated) =>
              setProject((prev) => (prev ? { ...prev, tasks: updated } : prev))
            }
            onClickTask={(task) => {
              setSelectedTask(task);
              setIsTaskDrawerOpen(true);
            }}
          />

          <TaskDrawer
            task={selectedTask}
            open={isTaskDrawerOpen}
            onClose={() => setIsTaskDrawerOpen(false)}
            onSave={(updated) =>
              setProject((prev) =>
                prev
                  ? {
                      ...prev,
                      tasks: prev.tasks.map((t) =>
                        t.id === updated.id ? updated : t
                      ),
                    }
                  : prev
              )
            }
          />
        </div>
      )}
    </AppLayout>
  );
}
