import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import {
  mockSubjects,
  mockTopics,
  mockPerformance,
  getTopicAverage,
  getTopicCategory
} from '../../utils/mockData';
import './student-subjects.css';

export default function StudentSubjects() {
  const navigation = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="icon-sm" /> },
    { name: 'My Subjects', path: '/student/subjects', icon: <BookOpen className="icon-sm" /> },
    { name: 'Schedule', path: '/student/schedule', icon: <Calendar className="icon-sm" /> },
    { name: 'Performance', path: '/student/performance', icon: <TrendingUp className="icon-sm" /> },
  ];

  const getCategoryBadge = (category) => {
    const variants = {
      strong: { variant: 'default', className: 'badge-success' },
      moderate: { variant: 'secondary', className: 'badge-warning' },
      weak: { variant: 'destructive', className: 'badge-destructive' },
    };

    const config = variants[category] || variants.strong;

    return (
      <Badge variant={config.variant} className={config.className}>
        {category}
      </Badge>
    );
  };

  return (
    <DashboardLayout navigation={navigation}>
      <div className="student-subjects">
        <div className="page-header">
          <h1 className="page-title">My Subjects</h1>
          <p className="page-subtitle">View all enrolled subjects and topic-wise performance</p>
        </div>

        <div className="subjects-grid">
          {mockSubjects.map(subject => {
            const subjectTopics = mockTopics.filter(t => t.subjectId === subject.id);

            // Calculate subject average
            const topicAverages = subjectTopics.map(topic =>
              getTopicAverage(topic.id, mockPerformance)
            ).filter(avg => avg !== null);

            const subjectAverage = topicAverages.length > 0
              ? topicAverages.reduce((sum, avg) => sum + avg, 0) / topicAverages.length
              : null;

            return (
              <Card key={subject.id}>
                <CardHeader>
                  <div className="card-header-row">
                    <div className="subject-info">
                      <CardTitle className="subject-title-row">
                        {subject.name}
                        <Badge variant="outline">{subject.code}</Badge>
                      </CardTitle>
                      <CardDescription className="subject-desc">
                        Faculty: {subject.facultyName} • Semester {subject.semester}
                      </CardDescription>
                    </div>
                    {subjectAverage !== null && (
                      <div className="subject-score">
                        <div className="score-value">{subjectAverage.toFixed(0)}%</div>
                        <div className="score-label">Subject Average</div>
                      </div>
                    )}
                  </div>
                  {subjectAverage !== null && (
                    <Progress value={subjectAverage} className="mt-4" />
                  )}
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="topics">
                      <AccordionTrigger>
                        View Topics ({subjectTopics.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="topics-list">
                          {subjectTopics.map(topic => {
                            const avg = getTopicAverage(topic.id, mockPerformance);
                            const category = avg !== null ? getTopicCategory(avg) : null;
                            const performances = mockPerformance.filter(p => p.topicId === topic.id);

                            return (
                              <div key={topic.id} className="topic-item">
                                <div className="topic-row">
                                  <div className="topic-name-row">
                                    <span className="topic-name">{topic.name}</span>
                                    {category && getCategoryBadge(category)}
                                  </div>
                                  {avg !== null && (
                                    <span className="topic-score">{avg.toFixed(0)}%</span>
                                  )}
                                </div>

                                {avg !== null && (
                                  <Progress value={avg} className="h-1 mb-2" />
                                )}

                                <div className="topic-meta">
                                  {performances.length > 0
                                    ? `${performances.length} test(s) recorded`
                                    : 'No performance data yet'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
