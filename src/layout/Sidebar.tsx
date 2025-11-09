import { useState, useEffect } from 'react';
import { Home, Folder, List, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ✅ 화면 크기에 따라 자동 축소
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-56'}`}
    >
      {/* 로고 영역 */}
      <div className='flex items-center justify-center p-4'>
        {!isCollapsed && (
          <span className='text-2xl font-bold text-blue-600'>FlowLog</span>
        )}
        {isCollapsed && (
          <span className='text-blue-600 text-xl font-bold'>F</span>
        )}
      </div>

      {/* 메뉴 리스트 */}
      <nav className='flex flex-col gap-2 mt-2 px-2'>
        <SidebarItem
          icon={<Home size={20} />}
          label='Flow Board'
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Folder size={20} />}
          label='Projects'
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={<List size={20} />}
          label='My Tasks'
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Users size={20} />}
          label='Members'
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          label='Settings'
          collapsed={isCollapsed}
        />
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function SidebarItem({ icon, label, collapsed }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition
      ${collapsed ? 'justify-center' : 'pl-4'}`}
    >
      {icon}
      {!collapsed && <span className='text-gray-700 font-medium'>{label}</span>}
    </div>
  );
}
