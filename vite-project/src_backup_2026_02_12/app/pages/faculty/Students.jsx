import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, BookOpen, Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  mockUsers,
  mockSubjects,
  mockTopics,
  mockPerformance,
  mockSchedule,
  getTopicAverage,
  getTopicCategory
} from '../../utils/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import './students.css';

export default function FacultyStudents() {
  const navigation = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Subjects & Topics', path: '/faculty/subjects', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Student Monitoring', path: '/faculty/students', icon: <Users className="w-4 h-4" /> },
  ];

  const student = mockUsers.find(u => u.role === 'student');

  // Calculate student statistics
  const totalTests = mockPerformance.length;
  const averageScore = mockPerformance.reduce((sum, p) =>
    sum + (p.marks / p.maxMarks * 100), 0
  ) / totalTests;

  const completedSchedules = mockSchedule.filter(s => s.status === 'completed').length;
  const completionRate = (completedSchedules / mockSchedule.length) * 100;

  // Topic performance data
  const topicPerformanceData = mockTopics
    .map(topic => {
      const avg = getTopicAverage(topic.id, mockPerformance);
      const subject = mockSubjects.find(s => s.id === topic.subjectId);
      return avg !== null ? {
        topic: topic.name,
        subject: subject?.code || '',
        score: Math.round(avg),
        category: getTopicCategory(avg)
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a?.score || 0) - (b?.score || 0));

  // Performance trend data
  const trendData = mockPerformance
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(p => ({
      date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round((p.marks / p.maxMarks) * 100),
    }));

  return (
    <DashboardLayout navigation={navigation}>
      <div className="students-container">
        {/* Header */}
        <div>
          <h1 className="page-title">Student Monitoring</h1>
          <p className="page-subtitle">Track individual student progress and performance</p>
        </div>

        {/* Student Info Card */}
        <Card className="student-info-card">
          <CardHeader>
            <div className="student-info-header">
              <div>
                <CardTitle className="student-name">{student?.name}</CardTitle>
                <CardDescription className="student-details">
                  Roll Number: {student?.rollNumber} <br />
                  Department: {student?.department} • Semester {student?.semester}
                </CardDescription>
              </div>
              <Badge className="status-badge">Active</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Tests</CardDescription>
              <CardTitle className="stat-value">{totalTests}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Score</CardDescription>
              <CardTitle className="stat-value">{averageScore.toFixed(1)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={averageScore} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Schedule Completion</CardDescription>
              <CardTitle className="stat-value">{completionRate.toFixed(0)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={completionRate} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Enrolled Subjects</CardDescription>
              <CardTitle className="stat-value">{mockSubjects.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Performance Analysis */}
        <Tabs defaultValue="topics">
          <TabsList className="analysis-tabs-list">
            <TabsTrigger value="topics">Topic Performance</TabsTrigger>
            <TabsTrigger value="trend">Progress Trend</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Status</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="analysis-tabs">
            <Card>
              <CardHeader>
                <CardTitle>Topic-wise Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of student performance across all topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="topics-list">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={topicPerformanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="topic" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#3b82f6" name="Score %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Performance Categories</CardTitle>
                <CardDescription>Topics grouped by performance level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="topics-list">
                  {/* Weak Topics */}
                  <div>
                    <div className="topic-category-header">
                      <TrendingDown className="w-5 h-5 icon-red" />
                      <h4 className="topic-category-title">Needs Improvement (Weak)</h4>
                    </div>
                    <div className="topic-items">
                      {topicPerformanceData?.filter(t => t?.category === 'weak').map(item => (
                        <div key={item?.topic} className="topic-item weak">
                          <div>
                            <div className="topic-name">{item?.topic}</div>
                            <div className="topic-subject">{item?.subject}</div>
                          </div>
                          <Badge variant="destructive">{item?.score}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Moderate Topics */}
                  <div>
                    <div className="topic-category-header">
                      <Minus className="w-5 h-5 icon-yellow" />
                      <h4 className="topic-category-title">Satisfactory (Moderate)</h4>
                    </div>
                    <div className="topic-items">
                      {topicPerformanceData?.filter(t => t?.category === 'moderate').map(item => (
                        <div key={item?.topic} className="topic-item moderate">
                          <div>
                            <div className="topic-name">{item?.topic}</div>
                            <div className="topic-subject">{item?.subject}</div>
                          </div>
                          <Badge variant="secondary" className="badge-yellow">{item?.score}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strong Topics */}
                  <div>
                    <div className="topic-category-header">
                      <TrendingUp className="w-5 h-5 icon-green" />
                      <h4 className="topic-category-title">Excellent (Strong)</h4>
                    </div>
                    <div className="topic-items">
                      {topicPerformanceData?.filter(t => t?.category === 'strong').map(item => (
                        <div key={item?.topic} className="topic-item strong">
                          <div>
                            <div className="topic-name">{item?.topic}</div>
                            <div className="topic-subject">{item?.subject}</div>
                          </div>
                          <Badge variant="default" className="badge-completed">{item?.score}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trend" className="analysis-tabs">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend Over Time</CardTitle>
                <CardDescription>Track how the student's performance changes across tests</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      name="Score %"
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Recent Test History</CardTitle>
                <CardDescription>Detailed view of recent test performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="history-list">
                  {mockPerformance.slice().reverse().map(perf => {
                    const topic = mockTopics.find(t => t.id === perf.topicId);
                    const subject = mockSubjects.find(s => s.id === topic?.subjectId);
                    const percentage = (perf.marks / perf.maxMarks) * 100;

                    return (
                      <div key={perf.id} className="history-item">
                        <div className="history-details">
                          <div className="font-medium">{topic?.name}</div>
                          <div className="text-sm text-gray-500">
                            {subject?.name} • {perf.testName}
                          </div>
                          <div className="history-date">
                            {new Date(perf.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="history-score">
                          <div className="score-percentage">{percentage.toFixed(0)}%</div>
                          <div className="text-sm text-gray-500">
                            {perf.marks}/{perf.maxMarks}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="analysis-tabs">
            <Card>
              <CardHeader>
                <CardTitle>Reinforcement Schedule Status</CardTitle>
                <CardDescription>Monitor student's adherence to reinforcement plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="test-schedule-list">
                  {mockSchedule.map(schedule => {
                    const topic = mockTopics.find(t => t.id === schedule.topicId);
                    const subject = mockSubjects.find(s => s.id === schedule.subjectId);

                    return (
                      <div key={schedule.id} className="schedule-item">
                        <div className="history-details">
                          <div className="font-medium">{topic?.name}</div>
                          <div className="text-sm text-gray-500">{subject?.name}</div>
                          <div className="history-date">
                            Scheduled: {new Date(schedule.scheduledDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="schedule-badges">
                          <Badge
                            variant={
                              schedule.priority === 'high' ? 'destructive' :
                                schedule.priority === 'medium' ? 'default' :
                                  'secondary'
                            }
                          >
                            {schedule.priority}
                          </Badge>
                          <Badge
                            variant={
                              schedule.status === 'completed' ? 'default' :
                                schedule.status === 'missed' ? 'destructive' :
                                  'outline'
                            }
                            className={
                              schedule.status === 'completed' ? 'badge-completed' : ''
                            }
                          >
                            {schedule.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
