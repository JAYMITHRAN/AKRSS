import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, BookOpen, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  mockSubjects,
  mockTopics,
  mockPerformance,
  mockSchedule,
  getTopicAverage,
  getTopicCategory
} from '../../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css';

export default function FacultyDashboard() {
  const navigation = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Subjects & Topics', path: '/faculty/subjects', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Student Monitoring', path: '/faculty/students', icon: <Users className="w-4 h-4" /> },
  ];

  // Calculate statistics
  const totalSubjects = mockSubjects.length;
  const totalTopics = mockTopics.length;
  const totalStudents = 1; // In real app, would count unique students
  const activeSchedules = mockSchedule.filter(s => s.status === 'pending').length;

  // Calculate average performance per subject
  const subjectPerformance = mockSubjects.map(subject => {
    const subjectTopics = mockTopics.filter(t => t.subjectId === subject.id);
    const averages = subjectTopics.map(t => getTopicAverage(t.id, mockPerformance)).filter(Boolean);
    const avg = averages.length > 0 ? averages.reduce((a, b) => a + b, 0) / averages.length : 0;

    return {
      name: subject.code,
      average: Math.round(avg),
    };
  });

  // Find topics needing attention
  const weakTopics = mockTopics.map(topic => {
    const avg = getTopicAverage(topic.id, mockPerformance);
    return { topic, avg, category: avg ? getTopicCategory(avg) : null };
  }).filter(item => item.category === 'weak');

  return (
    <DashboardLayout navigation={navigation}>
      <div className="dashboard-container">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">Faculty Dashboard</h1>
          <p className="dashboard-subtitle">Monitor student performance and manage course content</p>
        </div>

        {/* Stats Cards */}
        <div className="stat-grid">
          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Total Subjects</CardTitle>
              <BookOpen className="stat-icon icon-blue" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{totalSubjects}</div>
              <p className="stat-subtext">Semester 5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Total Topics</CardTitle>
              <TrendingUp className="stat-icon icon-purple" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{totalTopics}</div>
              <p className="stat-subtext">Across all subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Active Students</CardTitle>
              <Users className="stat-icon icon-green" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{totalStudents}</div>
              <p className="stat-subtext">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Active Schedules</CardTitle>
              <AlertTriangle className="stat-icon icon-orange" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{activeSchedules}</div>
              <p className="stat-subtext">Pending sessions</p>
            </CardContent>
          </Card>
        </div>

        <div className="content-grid">
          {/* Subject Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Overview</CardTitle>
              <CardDescription>Average student scores across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#3b82f6" name="Average %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Topics Needing Attention */}
          <Card>
            <CardHeader>
              <CardTitle className="card-title-group">
                <AlertTriangle className="feature-icon icon-orange" />
                Topics Needing Attention
              </CardTitle>
              <CardDescription>Topics with low student performance</CardDescription>
            </CardHeader>
            <CardContent>
              {weakTopics.length > 0 ? (
                <div className="weak-topics-list">
                  {weakTopics.slice(0, 5).map(({ topic, avg }) => {
                    const subject = mockSubjects.find(s => s.id === topic.subjectId);

                    return (
                      <div key={topic.id} className="alert-item">
                        <div className="alert-item-header">
                          <div className="alert-item-content">
                            <div className="topic-name">{topic.name}</div>
                            <div className="topic-subject">{subject?.name}</div>
                          </div>
                          <Badge variant="destructive" className="score-badge">
                            {avg?.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={avg || 0} className="progress-bar" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <TrendingUp className="empty-state-icon" />
                  <p>All topics are performing well!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subject Cards */}
        <div className="subjects-grid">
          {mockSubjects.map(subject => {
            const subjectTopics = mockTopics.filter(t => t.subjectId === subject.id);
            const topicAverages = subjectTopics.map(t =>
              getTopicAverage(t.id, mockPerformance)
            ).filter(Boolean);

            const subjectAverage = topicAverages.length > 0
              ? topicAverages.reduce((a, b) => a + b, 0) / topicAverages.length
              : 0;

            return (
              <Card key={subject.id}>
                <CardHeader>
                  <div className="subject-card-header">
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription className="subject-info">
                        {subject.code} • {subjectTopics.length} topics
                      </CardDescription>
                    </div>
                    <div className="subject-score">
                      <div className="score-value">{subjectAverage.toFixed(0)}%</div>
                      <div className="score-label">Average</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={subjectAverage} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
