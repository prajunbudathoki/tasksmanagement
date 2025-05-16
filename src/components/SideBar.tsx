import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Bell,
  User,
  PlusCircle,
  BookOpenCheck
} from 'lucide-react'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { icon: PlusCircle, label: 'Create board' },
    { icon: LayoutDashboard, label: 'Browse boards' },
    { icon: User, label: 'My work' },
    { icon: Bell, label: 'Notifications' },
    { icon: BookOpenCheck, label: 'Quick start', highlight: true }
  ]

  return (
    <aside
      className={`h-[750px] mt-5 ml-2 rounded-xl bg-[#f8f6ff] flex flex-col justify-between border-r transition-all ${
        collapsed ? 'w-20' : 'w-70'
      }`}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-3  border-b-3">
          {!collapsed && (
            <span className="text-lg font-bold">Big bracket pvt ltd</span>
          )}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <nav className="space-y-1 mt-4">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-purple-100 
              }`}
            >
              <item.icon className="h-5 w-5 " />
              {!collapsed && (
                <span className="ml-3 text-sm text-gray-800">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="px-4 py-3 flex items-center space-x-3 border-t">
        <img
          src="https://www.gravatar.com/avatar?d=mp"
          alt="avatar"
          className="h-8 w-8 rounded-full"
        />
        {/* pending work to done*/}
        {/* work in progress */}
        {!collapsed && (
          <div>
            <div className="text-sm font-medium">Prajun Budhathoki</div>
            <div className="text-xs text-gray-500">prajunbudhathoki1@gmail.com</div>
          </div>
        )}
      </div>
    </aside>
  )
}




