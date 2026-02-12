
import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, BookOpen, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import {
  mockSubjects as initialSubjects,
  mockTopics as initialTopics
} from '../../utils/mockData';
import { toast } from 'sonner';

export default function FacultySubjects() {
  const navigation = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Subjects & Topics', path: '/faculty/subjects', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Student Monitoring', path: '/faculty/students', icon: <Users className="w-4 h-4" /> },
  ];

  const [subjects, setSubjects] = useState(initialSubjects);
  const [topics, setTopics] = useState(initialTopics);
  const [subjectDialogOpen, setSubjectDialogOpen] = useState(false);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    semester: '5',
  });

  const [newTopic, setNewTopic] = useState({
    name: '',
    subjectId: '',
  });

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.code) {
      toast.error('Please fill all fields');
      return;
    }

    const subject = {
      id: `s${subjects.length + 1}`,
      name: newSubject.name,
      code: newSubject.code,
      semester: parseInt(newSubject.semester),
      facultyId: '2',
      facultyName: 'Dr. Kumar',
    };

    setSubjects([...subjects, subject]);
    setSubjectDialogOpen(false);
    setNewSubject({ name: '', code: '', semester: '5' });
    toast.success('Subject added successfully!');
  };

  const handleAddTopic = () => {
    if (!newTopic.name || !newTopic.subjectId) {
      toast.error('Please fill all fields');
      return;
    }

    const subjectTopics = topics.filter(t => t.subjectId === newTopic.subjectId);
    const maxOrder = subjectTopics.length > 0
      ? Math.max(...subjectTopics.map(t => t.order))
      : 0;

    const topic = {
      id: `t${topics.length + 1}`,
      name: newTopic.name,
      subjectId: newTopic.subjectId,
      order: maxOrder + 1,
    };

    setTopics([...topics, topic]);
    setTopicDialogOpen(false);
    setNewTopic({ name: '', subjectId: '' });
    toast.success('Topic added successfully!');
  };

  const handleDeleteTopic = (topicId) => {
    setTopics(topics.filter(t => t.id !== topicId));
    toast.success('Topic deleted');
  };

  return (
    <DashboardLayout navigation={navigation}>
      <div className="subjects-container">
        {/* Header */}
        <div className="subjects-header">
          <div>
            <h1 className="page-title">Subjects & Topics</h1>
            <p className="page-subtitle">Manage course structure and topic organization</p>
          </div>
          <Dialog open={subjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
                <DialogDescription>
                  Create a new subject for the semester
                </DialogDescription>
              </DialogHeader>
              <div className="dialog-form">
                <div className="form-group">
                  <Label>Subject Name</Label>
                  <Input
                    placeholder="e.g., Machine Learning"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <Label>Subject Code</Label>
                  <Input
                    placeholder="e.g., CS501"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <Label>Semester</Label>
                  <Input
                    type="number"
                    value={newSubject.semester}
                    onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
                  />
                </div>
                <Button className="w-full" onClick={handleAddSubject}>
                  Add Subject
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Subjects List */}
        <div className="subjects-grid">
          {subjects.map(subject => {
            const subjectTopics = topics.filter(t => t.subjectId === subject.id);

            return (
              <Card key={subject.id}>
                <CardHeader>
                  <div className="subject-card-header-content">
                    <div>
                      <CardTitle className="subject-title-group">
                        {subject.name}
                        <Badge variant="outline">{subject.code}</Badge>
                      </CardTitle>
                      <CardDescription className="subject-details">
                        Semester {subject.semester} • {subjectTopics.length} topics
                      </CardDescription>
                    </div>
                    <Dialog open={topicDialogOpen && selectedSubject === subject.id} onOpenChange={(open) => {
                      setTopicDialogOpen(open);
                      if (open) setSelectedSubject(subject.id);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Topic
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Topic to {subject.name}</DialogTitle>
                          <DialogDescription>
                            Create a new topic under this subject
                          </DialogDescription>
                        </DialogHeader>
                        <div className="dialog-form">
                          <div className="form-group">
                            <Label>Topic Name</Label>
                            <Input
                              placeholder="e.g., Linear Regression"
                              value={newTopic.name}
                              onChange={(e) => setNewTopic({ name: e.target.value, subjectId: subject.id })}
                            />
                          </div>
                          <Button className="w-full" onClick={handleAddTopic}>
                            Add Topic
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="topics">
                      <AccordionTrigger>
                        View Topics ({subjectTopics.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        {subjectTopics.length > 0 ? (
                          <div className="topics-list-container">
                            {subjectTopics.map((topic, index) => (
                              <div key={topic.id} className="topic-list-item">
                                <div className="topic-info-group">
                                  <div className="topic-index-circle">
                                    {index + 1}
                                  </div>
                                  <span className="font-medium">{topic.name}</span>
                                </div>
                                <div className="topic-actions-group">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteTopic(topic.id)}
                                  >
                                    <Trash2 className="w-4 h-4 icon-red" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="empty-topics-state">
                            <BookOpen className="empty-topics-icon" />
                            <p>No topics added yet</p>
                            <p className="text-sm">Click "Add Topic" to get started</p>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <Card className="info-box-card">
          <CardContent className="pt-6">
            <div className="info-box-content">
              <div className="info-box-icon">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="info-box-text">
                <h4>Subject & Topic Management</h4>
                <p className="info-box-desc">
                  Organize your course content by creating subjects and breaking them down into topics.
                  Topics are used for performance tracking and generating personalized reinforcement schedules for students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
