// Mock data store for the application

// Mock Users
export const mockUsers = [
  {
    id: '1',
    name: 'Jaymithran R',
    email: '7376232al129@student.edu',
    role: 'student',
    rollNumber: '7376232AL129',
    department: 'AI & ML',
    semester: 5,
  },
  {
    id: '2',
    name: 'Dr. Kumar',
    email: 'kumar@college.edu',
    role: 'faculty',
    department: 'AI & ML',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@college.edu',
    role: 'admin',
  },
];

// Mock Subjects
export const mockSubjects = [
  { id: 's1', name: 'Machine Learning', code: 'CS501', semester: 5, facultyId: '2', facultyName: 'Dr. Kumar' },
  { id: 's2', name: 'Deep Learning', code: 'CS502', semester: 5, facultyId: '2', facultyName: 'Dr. Kumar' },
  { id: 's3', name: 'Natural Language Processing', code: 'CS503', semester: 5, facultyId: '2', facultyName: 'Dr. Kumar' },
  { id: 's4', name: 'Computer Vision', code: 'CS504', semester: 5, facultyId: '2', facultyName: 'Dr. Kumar' },
];

// Mock Topics
export const mockTopics = [
  // Machine Learning Topics
  { id: 't1', name: 'Linear Regression', subjectId: 's1', order: 1 },
  { id: 't2', name: 'Logistic Regression', subjectId: 's1', order: 2 },
  { id: 't3', name: 'Decision Trees', subjectId: 's1', order: 3 },
  { id: 't4', name: 'Support Vector Machines', subjectId: 's1', order: 4 },
  { id: 't5', name: 'Neural Networks Basics', subjectId: 's1', order: 5 },

  // Deep Learning Topics
  { id: 't6', name: 'Feedforward Networks', subjectId: 's2', order: 1 },
  { id: 't7', name: 'Convolutional Neural Networks', subjectId: 's2', order: 2 },
  { id: 't8', name: 'Recurrent Neural Networks', subjectId: 's2', order: 3 },
  { id: 't9', name: 'Transformers', subjectId: 's2', order: 4 },

  // NLP Topics
  { id: 't10', name: 'Text Preprocessing', subjectId: 's3', order: 1 },
  { id: 't11', name: 'Word Embeddings', subjectId: 's3', order: 2 },
  { id: 't12', name: 'Sequence Models', subjectId: 's3', order: 3 },

  // Computer Vision Topics
  { id: 't13', name: 'Image Processing Fundamentals', subjectId: 's4', order: 1 },
  { id: 't14', name: 'Object Detection', subjectId: 's4', order: 2 },
  { id: 't15', name: 'Image Segmentation', subjectId: 's4', order: 3 },
];

// Mock Performance Data
export const mockPerformance = [
  // Machine Learning
  { id: 'p1', studentId: '1', topicId: 't1', marks: 18, maxMarks: 20, date: '2026-01-15', testName: 'Internal Test 1' },
  { id: 'p2', studentId: '1', topicId: 't2', marks: 12, maxMarks: 20, date: '2026-01-20', testName: 'Internal Test 1' },
  { id: 'p3', studentId: '1', topicId: 't3', marks: 15, maxMarks: 20, date: '2026-01-25', testName: 'Internal Test 1' },
  { id: 'p4', studentId: '1', topicId: 't4', marks: 9, maxMarks: 20, date: '2026-01-30', testName: 'Internal Test 2' },
  { id: 'p5', studentId: '1', topicId: 't5', marks: 16, maxMarks: 20, date: '2026-02-05', testName: 'Internal Test 2' },

  // Deep Learning
  { id: 'p6', studentId: '1', topicId: 't6', marks: 17, maxMarks: 20, date: '2026-01-18', testName: 'Quiz 1' },
  { id: 'p7', studentId: '1', topicId: 't7', marks: 11, maxMarks: 20, date: '2026-01-28', testName: 'Internal Test 1' },
  { id: 'p8', studentId: '1', topicId: 't8', marks: 14, maxMarks: 20, date: '2026-02-03', testName: 'Quiz 2' },
];

// Mock Schedule Data
export const mockSchedule = [
  { id: 'sch1', studentId: '1', topicId: 't2', subjectId: 's1', scheduledDate: '2026-02-12', status: 'pending', priority: 'high' },
  { id: 'sch2', studentId: '1', topicId: 't4', subjectId: 's1', scheduledDate: '2026-02-12', status: 'pending', priority: 'high' },
  { id: 'sch3', studentId: '1', topicId: 't7', subjectId: 's2', scheduledDate: '2026-02-13', status: 'pending', priority: 'high' },
  { id: 'sch4', studentId: '1', topicId: 't3', subjectId: 's1', scheduledDate: '2026-02-14', status: 'pending', priority: 'medium' },
  { id: 'sch5', studentId: '1', topicId: 't1', subjectId: 's1', scheduledDate: '2026-02-16', status: 'pending', priority: 'low' },
  { id: 'sch6', studentId: '1', topicId: 't8', subjectId: 's2', scheduledDate: '2026-02-17', status: 'pending', priority: 'medium' },
];

// Mock Notifications
export const mockNotifications = [
  { id: 'n1', userId: '1', message: 'Reminder: Revise Logistic Regression today', date: '2026-02-12T09:00:00', read: false, type: 'reminder' },
  { id: 'n2', userId: '1', message: 'Your performance in SVM topic is below threshold', date: '2026-02-11T14:30:00', read: false, type: 'alert' },
  { id: 'n3', userId: '1', message: 'New reinforcement schedule generated', date: '2026-02-10T10:00:00', read: true, type: 'info' },
];

// Helper function to calculate performance percentage
export function calculatePerformance(marks, maxMarks) {
  return (marks / maxMarks) * 100;
}

// Helper function to get topic performance category
export function getTopicCategory(percentage) {
  if (percentage >= 75) return 'strong';
  if (percentage >= 50) return 'moderate';
  return 'weak';
}

// Helper function to get average performance for a topic
export function getTopicAverage(topicId, performances) {
  const topicPerformances = performances.filter(p => p.topicId === topicId);
  if (topicPerformances.length === 0) return null;

  const totalPercentage = topicPerformances.reduce((sum, p) => {
    return sum + calculatePerformance(p.marks, p.maxMarks);
  }, 0);

  return totalPercentage / topicPerformances.length;
}

// Local storage helpers
export function getCurrentUser() {
  const userStr = localStorage.getItem('akrss_current_user');
  return userStr ? JSON.parse(userStr) : null;
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('akrss_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('akrss_current_user');
  }
}
