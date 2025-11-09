interface Project {
  id: number;
  name: string;
  owner: string;
  progress: number;
  dueDate: string;
  teamName: string;
}

interface ProjectCardProps {
  project: Project;
  size: 'L' | 'M' | 'S';
}

export default function ProjectCard({ project, size }: ProjectCardProps) {
  // 크기별 Tailwind 스타일
  const sizeStyles = {
    L: 'p-6 text-base',
    M: 'p-4 text-sm',
    S: 'p-3 text-xs',
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 ${sizeStyles[size]}`}
    >
      <h3
        className={`${
          size === 'S' ? 'text-base' : size === 'M' ? 'text-lg' : 'text-xl'
        } font-semibold text-gray-700 mb-2`}
      >
        {project.name}
      </h3>

      {/* 카드 내용 (S일 때 일부 생략) */}
      {size !== 'S' && (
        <>
          <p className='text-gray-500 mb-1'>担当者: {project.owner}</p>
          <p className='text-gray-500 mb-3'>期限: {project.dueDate}</p>
        </>
      )}

      {/* 진행률 바 */}
      <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
        <div
          className='bg-blue-500 h-3 rounded-full transition-all duration-300'
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <p className='text-right text-gray-600'>{project.progress}% 完了</p>
    </div>
  );
}
