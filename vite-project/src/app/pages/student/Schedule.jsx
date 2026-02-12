
import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, BookOpen, Calendar, TrendingUp, CheckCircle2, Circle, XCircle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  mockSubjects,
  mockTopics,
  mockSchedule,
} from '../../utils/mockData';
import { toast } from 'sonner';


export default function StudentSchedule() {
  const navigation = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'My Subjects', path: '/student/subjects', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Schedule', path: '/student/schedule', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Performance', path: '/student/performance', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const [schedules, setSchedules] = useState(mockSchedule);

  const handleMarkComplete = (scheduleId) => {
    setSchedules(prev => prev.map(s =>
      s.id === scheduleId ? { ...s, status: 'completed' } : s
    ));
    toast.success('Session marked as completed!');
  };

  const getSchedulesByDate = () => {
    const grouped = {};
    schedules.forEach(schedule => {
      if (!grouped[schedule.scheduledDate]) {
        grouped[schedule.scheduledDate] = [];
      }
      grouped[schedule.scheduledDate].push(schedule);
    });
    return grouped;
  };

  const groupedSchedules = getSchedulesByDate();
  const sortedDates = Object.keys(groupedSchedules).sort();

  const todaySchedules = schedules.filter(s => s.scheduledDate === '2026-02-12');
  const upcomingSchedules = schedules.filter(s => s.scheduledDate > '2026-02-12');
  const completedSchedules = schedules.filter(s => s.status === 'completed');

  const renderScheduleItem = (schedule) => {
    const topic = mockTopics.find(t => t.id === schedule.topicId);
    const subject = mockSubjects.find(s => s.id === schedule.subjectId);

    const statusConfig = {
      pending: { icon: Circle, className: 'status-pending', iconClass: 'icon-pending' },
      completed: { icon: CheckCircle2, className: 'status-completed', iconClass: 'icon-completed' },
      missed: { icon: XCircle, className: 'status-missed', iconClass: 'icon-missed' },
    };

    const config = statusConfig[schedule.status];
    const StatusIcon = config.icon;

    return (
      <div key={schedule.id} className={`schedule-item ${config.className}`}>
        <div className="schedule-item-content">
          <StatusIcon className={`status-icon ${config.iconClass}`} />

          <div className="schedule-details">
            <div className="schedule-header-row">
              <div>
                <h4 className="topic-title">{topic?.name}</h4>
                <p className="subject-name">{subject?.name}</p>
              </div>
              <Badge
                variant={
                  schedule.priority === 'high' ? 'destructive' :
                    schedule.priority === 'medium' ? 'default' :
                      'secondary'
                }
              >
                {schedule.priority} priority
              </Badge>
            </div>

            <div className="schedule-date-row">
              <Calendar className="w-4 h-4" />
              {new Date(schedule.scheduledDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {schedule.status === 'pending' && (
              <Button
                size="sm"
                className="mark-complete-btn"
                onClick={() => handleMarkComplete(schedule.id)}
              >
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout navigation={navigation}>
      <div className="schedule-container">
        <div className="schedule-header">
          <h1 className="page-title">Reinforcement Schedule</h1>
          <p className="page-subtitle">Your personalized study plan based on performance analysis</p>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's Sessions</CardDescription>
              <CardTitle className="stat-value">{todaySchedules.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Upcoming Sessions</CardDescription>
              <CardTitle className="stat-value">{upcomingSchedules.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="stat-value">{completedSchedules.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Schedule Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Overview</CardTitle>
            <CardDescription>View your reinforcement sessions organized by status</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="schedule-tabs-list">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="schedule-tabs">
                {sortedDates.map(date => (
                  <div key={date} className="date-group">
                    <h3 className="date-header">
                      <Calendar className="date-icon" />
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    <div className="schedule-list">
                      {groupedSchedules[date].map(renderScheduleItem)}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="today" className="schedule-tabs">
                {todaySchedules.length > 0 ? (
                  <div className="schedule-list">
                    {todaySchedules.map(renderScheduleItem)}
                  </div>
                ) : (
                  <div className="empty-state">
                    <CheckCircle2 className="empty-state-icon green" />
                    <p className="empty-title">No sessions for today!</p>
                    <p className="empty-desc">Enjoy your day or review previous topics</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="schedule-tabs">
                {upcomingSchedules.length > 0 ? (
                  <div className="schedule-list">
                    {upcomingSchedules.map(renderScheduleItem)}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Calendar className="empty-state-icon" />
                    <p className="empty-title">No upcoming sessions</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="schedule-tabs">
                {completedSchedules.length > 0 ? (
                  <div className="schedule-list">
                    {completedSchedules.map(renderScheduleItem)}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Circle className="empty-state-icon" />
                    <p className="empty-title">No completed sessions yet</p>
                    <p className="empty-desc">Start completing your scheduled sessions</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="info-card">
          <CardContent className="pt-6">
            <div className="info-content">
              <div className="info-text info-icon">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="info-text">
                <h4>How the schedule works</h4>
                <p className="info-desc">
                  Your reinforcement schedule is automatically generated based on your topic performance.
                  Weak topics are scheduled more frequently, while strong topics have longer intervals.
                  Complete sessions on time to maintain optimal learning retention.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
