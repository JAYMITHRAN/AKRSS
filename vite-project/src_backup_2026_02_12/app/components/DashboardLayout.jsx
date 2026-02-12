import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { getCurrentUser, setCurrentUser } from '../utils/mockData';
import { LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useEffect } from 'react';
import './dashboard-layout.css';

export default function DashboardLayout({ children, navigation }) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-left">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="mobile-menu-trigger">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="nav-mobile">
                    {navigation.map((item) => (
                      <Link key={item.path} to={item.path}>
                        <Button variant="ghost" className="w-full justify-start">
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </Button>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="brand-section">
                <div className="brand-title">AKRSS</div>
                <div className="brand-subtitle">Knowledge Reinforcement System</div>
              </div>
            </div>

            <div className="header-right">
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-roll">{user.role}</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" className="w-full justify-start">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}