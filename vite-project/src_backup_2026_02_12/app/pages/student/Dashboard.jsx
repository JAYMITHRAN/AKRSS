import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  TrendingUp,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  mockSubjects,
  mockTopics,
  mockPerformance,
  mockSchedule,
  mockNotifications,
  getCurrentUser,
  getTopicAverage,
  getTopicCategory
} from '../../utils/mockData';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import './student-dashboard.css';

export default function StudentDashboard() {
  const user = getCurrentUser();

  const navigation = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="icon-sm" /> },
    { name: 'My Subjects', path: '/student/subjects', icon: <BookOpen className="icon-sm" /> },
    { name: 'Schedule', path: '/student/schedule', icon: <Calendar className="icon-sm" /> },
    { name: 'Performance', path: '/student/performance', icon: <TrendingUp className="icon-sm" /> },
  ];

  // Calculate statistics
  const enrolledSubjects = mockSubjects.length;
  const todaySchedule = mockSchedule.filter(s =>
    s.scheduledDate === '2026-02-12' && s.status === 'pending'
  );
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  // Get weak topics
  const weakTopics = mockTopics.filter(topic => {
    const avg = getTopicAverage(topic.id, mockPerformance);
    return avg !== null && getTopicCategory(avg) === 'weak';
  }).slice(0, 5);

  // Calculate overall performance
  const totalPerformances = mockPerformance.length;
  const averagePerformance = mockPerformance.reduce((sum, p) =>
    sum + (p.marks / p.maxMarks * 100), 0
  ) / totalPerformances;

  return (
    <DashboardLayout navigation={navigation}>
      <div className="student-dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {user?.name}!</h1>
          <p className="welcome-subtitle">Track your progress and stay on schedule with your reinforcement plan</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card>
            <CardHeader className="card-header-flex">
              <CardTitle className="card-title-sm">Enrolled Subjects</CardTitle>
              <BookOpen className="icon-sm icon-blue" />
            </CardHeader>
            <CardContent>
              <div className="stat-value">{enrolledSubjects}</div>
              <p className="stat-desc">Semester {user?.semester}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="card-header-flex">
              <CardTitle className="card-title-sm">Today's Sessions</CardTitle>
              <Calendar className="icon-sm icon-purple" />
            </CardHeader>
            <CardContent>
              <div className="stat-value">{todaySchedule.length}</div>
              <p className="stat-desc">Reinforcement tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="card-header-flex">
              <CardTitle className="card-title-sm">Average Score</CardTitle>
              <TrendingUp className="icon-sm icon-green" />
            </CardHeader>
            <CardContent>
              <div className="stat-value">{averagePerformance.toFixed(1)}%</div>
              <Progress value={averagePerformance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="card-header-flex">
              <CardTitle className="card-title-sm">Notifications</CardTitle>
              <Bell className="icon-sm icon-orange" />
            </CardHeader>
            <CardContent>
              <div className="stat-value">{unreadNotifications}</div>
              <p className="stat-desc">Unread alerts</p>
            </CardContent>
          </Card>
        </div>

        <div className="main-grid">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="card-title-flex">
                <Clock className="icon-md" />
                Today's Reinforcement Schedule
              </CardTitle>
              <CardDescription>Wednesday, February 11, 2026</CardDescription>
            </CardHeader>
            <CardContent>
              {todaySchedule.length > 0 ? (
                <div className="schedule-list">
                  {todaySchedule.map(schedule => {
                    const topic = mockTopics.find(t => t.id === schedule.topicId);
                    const subject = mockSubjects.find(s => s.id === schedule.subjectId);

                    return (
                      <div key={schedule.id} className="schedule-item">
                        <div className="item-info">
                          <div className="item-title">{topic?.name}</div>
                          <div className="item-subtitle">{subject?.name}</div>
                        </div>
                        <Badge
                          variant={
                            schedule.priority === 'high' ? 'destructive' :
                              schedule.priority === 'medium' ? 'default' :
                                'secondary'
                          }
                        >
                          {schedule.priority}
                        </Badge>
                      </div>
                    );
                  })}
                  <Link to="/student/schedule">
                    <Button variant="outline" className="w-full mt-2">
                      View Full Schedule
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="empty-state">
                  <CheckCircle className="icon-xl text-green" />
                  <p>No sessions scheduled for today!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Topics Needing Attention */}
          <Card>
            <CardHeader>
              <CardTitle className="card-title-flex">
                <AlertCircle className="icon-md icon-orange" />
                Topics Needing Attention
              </CardTitle>
              <CardDescription>Focus on these areas to improve</CardDescription>
            </CardHeader>
            <CardContent>
              {weakTopics.length > 0 ? (
                <div className="schedule-list">
                  {weakTopics.map(topic => {
                    const subject = mockSubjects.find(s => s.id === topic.subjectId);
                    const avg = getTopicAverage(topic.id, mockPerformance);

                    return (
                      <div key={topic.id} className="weak-topic-item">
                        <div className="topic-header">
                          <div className="item-info">
                            <div className="item-title">{topic.name}</div>
                            <div className="item-subtitle">{subject?.name}</div>
                          </div>
                          <Badge variant="destructive">
                            {avg?.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={avg || 0} className="progress-thin" />
                      </div>
                    );
                  })}
                  <Link to="/student/performance">
                    <Button variant="outline" className="w-full mt-2">
                      View Detailed Analysis
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="empty-state">
                  <CheckCircle className="icon-xl text-green" />
                  <p>Great! All topics are performing well</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="card-title-flex">
              <Bell className="icon-md" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="notifications-list">
              {mockNotifications.slice(0, 3).map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'notification-read' : 'notification-unread'}`}
                >
                  <div className="notification-content">
                    <Bell className={`notification-icon ${notification.read ? 'text-gray-400' : 'icon-blue'}`} />
                    <div className="item-info">
                      <p className="item-title">{notification.message}</p>
                      <p className="item-subtitle">
                        {new Date(notification.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}