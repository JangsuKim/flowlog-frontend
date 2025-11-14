// src/components/project-detail/KanbanBoard.tsx
import type { Task } from '../../types/task';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';

interface Props {
  tasks: Task[];
  onAddTask?: () => void;
  onUpdateTasks?: (updated: Task[]) => void;
  onClickTask?: (task: Task) => void;
}

export default function KanbanBoard({
  tasks,
  onAddTask,
  onUpdateTasks,
  onClickTask,
}: Props) {
  const sections = [
    { key: 'BACKLOG', label: '未対応' },
    { key: 'IN_PROGRESS', label: '進行中' },
    { key: 'BEFORE_REVIEW', label: 'レビュー前' },
    { key: 'IN_REVIEW', label: 'レビュー中' },
    { key: 'PENDING', label: '保留' },
    { key: 'PRE_RELEASE', label: 'リリース前' },
    { key: 'DONE', label: '完了' },
  ] as const;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    const draggedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (!draggedTask) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    let updatedTasks = [...tasks];

    if (sourceStatus !== destStatus) {
      draggedTask.status = destStatus as Task['status'];
    }

    updatedTasks = updatedTasks.filter((t) => t.id !== draggedTask.id);
    updatedTasks.splice(destination.index, 0, draggedTask);

    onUpdateTasks?.(updatedTasks);
  };

  return (
    <section className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Kanban Board</h2>

        <button
          type='button'
          className='px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow'
          onClick={onAddTask}
        >
          ＋ タスク追加
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* ⭐ 바깥 래퍼: 페이지 폭은 넘지 않음, 여기서만 가로 스크롤 */}
        <div className='w-full overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
          {/* ⭐ 안쪽 래퍼: 실제 칼럼들을 가로로 쭉 펼치는 영역 */}
          <div className='inline-flex gap-6 min-h-[300px]'>
            {sections.map((sec) => (
              <KanbanColumn
                key={sec.key}
                droppableId={sec.key}
                title={sec.label}
                items={tasks.filter((t) => t.status === sec.key)}
                onClickTask={onClickTask}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </section>
  );
}

/* ------------------------------ */
/* ⭐ 컬럼 컴포넌트 */
/* ------------------------------ */
function KanbanColumn({
  title,
  droppableId,
  items,
  onClickTask,
}: {
  title: string;
  droppableId: string;
  items: Task[];
  onClickTask?: (t: Task) => void;
}) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='bg-[#F7F8FA] rounded-xl p-4 border border-gray-200 shadow-sm min-h-[260px] min-w-[200px]'
        >
          <h3 className='font-semibold text-gray-700 text-sm mb-4'>{title}</h3>

          <div className='space-y-3'>
            {items.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClickTask?.(task)}
                    className={`
                      p-4 bg-white border border-gray-200 rounded-lg shadow-sm
                      cursor-pointer transition
                      ${
                        snapshot.isDragging
                          ? 'shadow-2xl scale-[1.03] ring-2 ring-blue-300'
                          : 'hover:shadow-md'
                      }
                    `}
                    style={{
                      ...provided.draggableProps.style,
                      transition: snapshot.isDragging
                        ? 'transform 0.08s ease'
                        : 'none',
                    }}
                  >
                    <p className='font-medium text-gray-800 text-sm'>
                      {task.title}
                    </p>

                    {task.assigneeName && (
                      <p className='text-xs text-gray-500 mt-2'>
                        担当: {task.assigneeName}
                      </p>
                    )}

                    {task.tags && task.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1 mt-2'>
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className='px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] border border-purple-200'
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

            {items.length === 0 && (
              <p className='text-xs text-gray-400'>タスクがありません。</p>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}
