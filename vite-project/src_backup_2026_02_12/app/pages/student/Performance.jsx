
import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, BookOpen, Calendar, TrendingUp, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  mockSubjects,
  mockTopics,
  mockPerformance,
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
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from 'sonner';
import './student-performance.css';

export default function StudentPerformance() {
  const navigation = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'My Subjects', path: '/student/subjects', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Schedule', path: '/student/schedule', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Performance', path: '/student/performance', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const [performances, setPerformances] = useState(mockPerformance);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPerformance, setNewPerformance] = useState({
    subjectId: '',
    topicId: '',
    marks: '',
    maxMarks: '20',
    testName: '',
  });

  // Calculate category distribution
  const categoryData = mockTopics.map(topic => {
    const avg = getTopicAverage(topic.id, performances);
    return avg !== null ? getTopicCategory(avg) : null;
  }).filter(Boolean);

  const strongCount = categoryData.filter(c => c === 'strong').length;
  const moderateCount = categoryData.filter(c => c === 'moderate').length;
  const weakCount = categoryData.filter(c => c === 'weak').length;

  const pieData = [
    { name: 'Strong', value: strongCount, color: '#10b981' },
    { name: 'Moderate', value: moderateCount, color: '#f59e0b' },
    { name: 'Weak', value: weakCount, color: '#ef4444' },
  ];

  // Prepare bar chart data
  const barChartData = mockSubjects.map(subject => {
    const subjectTopics = mockTopics.filter(t => t.subjectId === subject.id);
    const topicAverages = subjectTopics.map(topic =>
      getTopicAverage(topic.id, performances)
    ).filter(avg => avg !== null);

    const average = topicAverages.length > 0
      ? topicAverages.reduce((sum, avg) => sum + avg, 0) / topicAverages.length
      : 0;

    return {
      subject: subject.code,
      average: Math.round(average),
    };
  });

  // Prepare trend data
  const trendData = performances
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(p => ({
      date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round((p.marks / p.maxMarks) * 100),
    }));

  const handleAddPerformance = () => {
    if (!newPerformance.subjectId || !newPerformance.topicId || !newPerformance.marks || !newPerformance.testName) {
      toast.error('Please fill all fields');
      return;
    }

    const performance = {
      id: `p${performances.length + 1}`,
      studentId: '1',
      topicId: newPerformance.topicId,
      marks: parseFloat(newPerformance.marks),
      maxMarks: parseFloat(newPerformance.maxMarks),
      date: new Date().toISOString().split('T')[0],
      testName: newPerformance.testName,
    };

    setPerformances([...performances, performance]);
    setDialogOpen(false);
    setNewPerformance({
      subjectId: '',
      topicId: '',
      marks: '',
      maxMarks: '20',
      testName: '',
    });
    toast.success('Performance added successfully!');
  };

  const filteredTopics = newPerformance.subjectId
    ? mockTopics.filter(t => t.subjectId === newPerformance.subjectId)
    : [];

  return (
    <DashboardLayout navigation={navigation}>
      <div className="performance-container">
        <div className="performance-header">
          <div>
            <h1 className="page-title">Performance Analytics</h1>
            <p className="page-subtitle">Track your academic progress and identify improvement areas</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Performance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Performance</DialogTitle>
                <DialogDescription>
                  Enter your test scores to track performance
                </DialogDescription>
              </DialogHeader>
              <div className="dialog-form">
                <div className="form-group">
                  <Label>Subject</Label>
                  <Select
                    value={newPerformance.subjectId}
                    onValueChange={(value) => setNewPerformance({ ...newPerformance, subjectId: value, topicId: '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSubjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <Label>Topic</Label>
                  <Select
                    value={newPerformance.topicId}
                    onValueChange={(value) => setNewPerformance({ ...newPerformance, topicId: value })}
                    disabled={!newPerformance.subjectId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredTopics.map(topic => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <Label>Test Name</Label>
                  <Input
                    placeholder="e.g., Internal Test 1"
                    value={newPerformance.testName}
                    onChange={(e) => setNewPerformance({ ...newPerformance, testName: e.target.value })}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <Label>Marks Obtained</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newPerformance.marks}
                      onChange={(e) => setNewPerformance({ ...newPerformance, marks: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <Label>Maximum Marks</Label>
                    <Input
                      type="number"
                      placeholder="20"
                      value={newPerformance.maxMarks}
                      onChange={(e) => setNewPerformance({ ...newPerformance, maxMarks: e.target.value })}
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={handleAddPerformance}>
                  Add Performance
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Strong Topics</CardDescription>
              <CardTitle className="summary-value text-green">{strongCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Moderate Topics</CardDescription>
              <CardTitle className="summary-value text-yellow">{moderateCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Weak Topics</CardDescription>
              <CardTitle className="summary-value text-red">{weakCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="charts-grid">
          {/* Subject-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Average scores across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#3b82f6" name="Average %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Topic Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Topic Category Distribution</CardTitle>
              <CardDescription>Performance breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your score progression over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} name="Score %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Scores</CardTitle>
            <CardDescription>Your latest performance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="recent-tests-list">
              {performances.slice().reverse().slice(0, 5).map(perf => {
                const topic = mockTopics.find(t => t.id === perf.topicId);
                const subject = mockSubjects.find(s => s.id === topic?.subjectId);
                const percentage = (perf.marks / perf.maxMarks) * 100;

                return (
                  <div key={perf.id} className="test-item">
                    <div className="test-info">
                      <div className="test-topic">{topic?.name}</div>
                      <div className="test-subject">
                        {subject?.name} • {perf.testName}
                      </div>
                      <div className="test-date">
                        {new Date(perf.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="test-score">
                      <div className="score-percentage">{percentage.toFixed(0)}%</div>
                      <div className="score-details">
                        {perf.marks}/{perf.maxMarks}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
