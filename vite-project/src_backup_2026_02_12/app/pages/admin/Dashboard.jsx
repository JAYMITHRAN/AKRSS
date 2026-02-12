import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { LayoutDashboard, Users, BookOpen, Settings, UserPlus, Shield } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { mockUsers, mockSubjects, mockTopics } from '../../utils/mockData';
import { toast } from 'sonner';
import './dashboard.css';

export default function AdminDashboard() {
  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  const [users, setUsers] = useState(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    rollNumber: '',
    department: '',
    semester: '',
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Please fill required fields');
      return;
    }

    const user = {
      id: `${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      ...(newUser.role === 'student' && {
        rollNumber: newUser.rollNumber,
        department: newUser.department,
        semester: parseInt(newUser.semester) || undefined,
      }),
      ...(newUser.role === 'faculty' && {
        department: newUser.department,
      }),
    };

    setUsers([...users, user]);
    setDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      rollNumber: '',
      department: '',
      semester: '',
    });
    toast.success('User added successfully!');
  };

  const studentCount = users.filter(u => u.role === 'student').length;
  const facultyCount = users.filter(u => u.role === 'faculty').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <DashboardLayout navigation={navigation}>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">System Administration</h1>
            <p className="dashboard-subtitle">Manage users, system configuration, and access control</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account in the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Enter full name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="user@college.edu"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newUser.role === 'student' && (
                  <>
                    <div className="space-y-2">
                      <Label>Roll Number</Label>
                      <Input
                        placeholder="e.g., 7376232AL129"
                        value={newUser.rollNumber}
                        onChange={(e) => setNewUser({ ...newUser, rollNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        placeholder="e.g., AI & ML"
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Semester</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 5"
                        value={newUser.semester}
                        onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {newUser.role === 'faculty' && (
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                      placeholder="e.g., AI & ML"
                      value={newUser.department}
                      onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    />
                  </div>
                )}

                <Button className="w-full" onClick={handleAddUser}>
                  Create User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="stat-grid">
          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Total Students</CardTitle>
              <Users className="stat-icon icon-blue" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{studentCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Faculty Members</CardTitle>
              <BookOpen className="stat-icon icon-purple" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{facultyCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Administrators</CardTitle>
              <Shield className="stat-icon icon-green" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{adminCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title">Total Subjects</CardTitle>
              <BookOpen className="stat-icon icon-orange" />
            </CardHeader>
            <CardContent>
              <div className="stat-val">{mockSubjects.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all system users</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === 'admin' ? 'default' :
                            user.role === 'faculty' ? 'secondary' :
                              'outline'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="user-details">
                      {user.role === 'student' && user.rollNumber && (
                        <div>
                          {user.rollNumber}<br />
                          {user.department} • Sem {user.semester}
                        </div>
                      )}
                      {user.role === 'faculty' && user.department && (
                        <div>{user.department}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="action-buttons">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Reset Password</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Manage system-wide settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="config-list">
              <div className="config-item">
                <div className="config-label-group">
                  <div className="config-label">Performance Threshold</div>
                  <div className="config-description">Marks below this are considered weak</div>
                </div>
                <div className="config-control">
                  <Input type="number" defaultValue="50" className="w-20" />
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div className="config-item">
                <div className="config-label-group">
                  <div className="config-label">Current Semester</div>
                  <div className="config-description">Active semester for scheduling</div>
                </div>
                <Input type="number" defaultValue="5" className="w-20" />
              </div>

              <div className="config-item">
                <div className="config-label-group">
                  <div className="config-label">Academic Year</div>
                  <div className="config-description">Current academic year</div>
                </div>
                <Input defaultValue="2025-2026" className="w-32" />
              </div>

              <Button>Save Configuration</Button>
            </div>
          </CardContent>
        </Card>

        {/* System Stats */}
        <div className="system-stats-grid">
          <Card>
            <CardHeader>
              <CardTitle>Database Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="stats-row">
                  <span className="stats-label">Total Users:</span>
                  <span className="stats-value">{users.length}</span>
                </div>
                <div className="stats-row">
                  <span className="stats-label">Total Subjects:</span>
                  <span className="stats-value">{mockSubjects.length}</span>
                </div>
                <div className="stats-row">
                  <span className="stats-label">Total Topics:</span>
                  <span className="stats-value">{mockTopics.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="stats-row">
                  <span className="stats-label">Database Status:</span>
                  <Badge className="badge-online">Online</Badge>
                </div>
                <div className="stats-row">
                  <span className="stats-label">Server Status:</span>
                  <Badge className="badge-online">Running</Badge>
                </div>
                <div className="stats-row">
                  <span className="stats-label">Last Backup:</span>
                  <span className="stats-value text-sm">Today, 3:00 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
