import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockUsers, setCurrentUser } from '../utils/mockData';
import { toast } from 'sonner';
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role) => {
    // Mock authentication
    const user = mockUsers.find(u => u.role === role);

    if (user) {
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);

      switch (role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'faculty':
          navigate('/faculty/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Header */}
        <div className="login-header">
          <div className="login-icon-container">
            <div className="login-icon-bg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="login-title">Academic Knowledge Reinforcement System</h1>
          <p className="login-subtitle">Strengthen your understanding through structured learning</p>
        </div>

        {/* Login Card */}
        <Card className="login-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access your account to track performance and reinforcement schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="login-tabs-list">
                <TabsTrigger value="student">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="faculty">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Faculty
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="login-tab-content">
                <div className="login-input-group">
                  <Label htmlFor="student-email">College Email / Roll Number</Label>
                  <Input
                    id="student-email"
                    placeholder="7376232AL129 or email@student.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-input-group">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleLogin('student')}
                >
                  Sign In as Student
                </Button>
                <p className="login-footer-text">
                  Demo: Use any credentials to login
                </p>
              </TabsContent>

              <TabsContent value="faculty" className="login-tab-content">
                <div className="login-input-group">
                  <Label htmlFor="faculty-email">Faculty Email</Label>
                  <Input
                    id="faculty-email"
                    placeholder="faculty@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-input-group">
                  <Label htmlFor="faculty-password">Password</Label>
                  <Input
                    id="faculty-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleLogin('faculty')}
                >
                  Sign In as Faculty
                </Button>
                <p className="login-footer-text">
                  Demo: Use any credentials to login
                </p>
              </TabsContent>

              <TabsContent value="admin" className="login-tab-content">
                <div className="login-input-group">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    placeholder="admin@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-input-group">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleLogin('admin')}
                >
                  Sign In as Admin
                </Button>
                <p className="login-footer-text">
                  Demo: Use any credentials to login
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="login-features-grid">
          <div className="login-feature-card">
            <div className="login-feature-title text-blue-600">Topic-wise Tracking</div>
            <p className="text-gray-600">Monitor performance for each topic</p>
          </div>
          <div className="login-feature-card">
            <div className="login-feature-title text-purple-600">Smart Scheduling</div>
            <p className="text-gray-600">AI-powered reinforcement plans</p>
          </div>
          <div className="login-feature-card">
            <div className="login-feature-title text-green-600">Progress Analytics</div>
            <p className="text-gray-600">Visual performance insights</p>
          </div>
        </div>
      </div>
    </div>
  );
}
