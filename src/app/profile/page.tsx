'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { Textarea } from '@/src/components/ui/textarea';
import { Badge } from '@/src/components/ui/badge';
import { Switch } from '@/src/components/ui/switch';
import { Camera, Edit2, LogOut, Mail, Phone, Save, User, X } from 'lucide-react';
import AppLayout from '@/src/app/layout-with-nav';

export default function ProfilePage() {
  // Mock user data from registration
  const [userData, setUserData] = useState({
    name: 'Anna Johansson',
    email: 'anna.johansson@example.com',
    phone: '+46 70 123 4567',
    bio: 'New to Sweden and looking to connect with people who share my interests in hiking, cooking, and art.',
    photoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    age: '28',
    interests: ['Hiking', 'Swedish Culture', 'Cooking', 'Art', 'Photography'],
    dietaryPreferences: ['Vegetarian'],
    mobilityAccessibility: ['Near public transit'],
    familyStatus: ['Family-friendly'],
    petPreferences: ['Dog-friendly'],
    language: 'English',
    notifications: {
      email: true,
      app: true,
      events: true,
      messages: true,
    },
    privacy: {
      profileVisibility: 'public',
      showActivity: true,
      showLocation: false,
    },
  });

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);

  // Handle edit mode submission
  const handleSaveProfile = () => {
    setUserData(editedUserData);
    setIsEditMode(false);
  };

  // Handle edit cancellation
  const handleCancelEdit = () => {
    setEditedUserData(userData);
    setIsEditMode(false);
  };

  // Update form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  // Toggle notification settings
  const handleNotificationToggle = (setting: string) => {
    setEditedUserData({
      ...editedUserData,
      notifications: {
        ...editedUserData.notifications,
        [setting]: !editedUserData.notifications[setting as keyof typeof editedUserData.notifications],
      },
    });
  };

  // Toggle privacy settings
  const handlePrivacyToggle = (setting: string) => {
    setEditedUserData({
      ...editedUserData,
      privacy: {
        ...editedUserData.privacy,
        [setting]: !editedUserData.privacy[setting as keyof typeof editedUserData.privacy],
      },
    });
  };

  // Remove interest
  const handleRemoveInterest = (interest: string) => {
    setEditedUserData({
      ...editedUserData,
      interests: editedUserData.interests.filter((i) => i !== interest),
    });
  };

  return (
    <AppLayout>
      <div className="pb-20">
        <header className="px-4 pt-6 pb-3 border-b sticky top-0 bg-background z-10">
          <h1 className="text-2xl font-bold">Profile</h1>
        </header>

        <div className="p-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader className="pb-2 relative">
                  <div className="flex justify-end absolute right-4 top-4">
                    {!isEditMode ? (
                      <Button variant="ghost" size="icon" onClick={() => setIsEditMode(true)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-2 border-primary">
                        <AvatarImage
                          src={isEditMode ? editedUserData.photoUrl : userData.photoUrl}
                          alt={userData.name}
                        />
                        <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {isEditMode && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {!isEditMode ? (
                      <CardTitle className="mt-4">{userData.name}</CardTitle>
                    ) : (
                      <div className="w-full max-w-sm mt-4">
                        <Input
                          name="name"
                          value={editedUserData.name}
                          onChange={handleInputChange}
                          className="text-center font-semibold"
                        />
                      </div>
                    )}
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Mail className="h-3 w-3" />
                      {isEditMode ? (
                        <Input
                          name="email"
                          value={editedUserData.email}
                          onChange={handleInputChange}
                          className="h-8 mt-1"
                        />
                      ) : (
                        userData.email
                      )}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {isEditMode ? (
                        <Input
                          name="phone"
                          value={editedUserData.phone}
                          onChange={handleInputChange}
                          className="h-8 mt-1"
                        />
                      ) : (
                        userData.phone
                      )}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Bio Section */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">About Me</h3>
                      {isEditMode ? (
                        <Textarea
                          name="bio"
                          value={editedUserData.bio}
                          onChange={handleInputChange}
                          className="resize-none"
                          rows={3}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{userData.bio}</p>
                      )}
                    </div>

                    {/* Interests Section */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">My Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {(isEditMode ? editedUserData.interests : userData.interests).map((interest) => (
                          <Badge key={interest} variant="secondary" className={isEditMode ? 'pr-1' : ''}>
                            {interest}
                            {isEditMode && (
                              <button
                                onClick={() => handleRemoveInterest(interest)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                        {isEditMode && (
                          <Badge variant="outline" className="bg-muted/50 cursor-pointer">
                            + Add Interest
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Preferences Summary */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <h3 className="font-medium mb-1">Age</h3>
                        {isEditMode ? (
                          <Input name="age" value={editedUserData.age} onChange={handleInputChange} className="h-8" />
                        ) : (
                          <p className="text-muted-foreground">{userData.age}</p>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Language</h3>
                        <p className="text-muted-foreground">{userData.language}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Dietary</h3>
                        <div className="flex flex-wrap gap-1">
                          {userData.dietaryPreferences.map((pref) => (
                            <Badge key={pref} variant="outline" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Mobility</h3>
                        <div className="flex flex-wrap gap-1">
                          {userData.mobilityAccessibility.map((acc) => (
                            <Badge key={acc} variant="outline" className="text-xs">
                              {acc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                {isEditMode && (
                  <CardFooter>
                    <Button onClick={handleSaveProfile} className="w-full">
                      <Save className="h-4 w-4 mr-2" /> Save Profile
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={editedUserData.notifications.email}
                      onCheckedChange={() => handleNotificationToggle('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-notifications">App Notifications</Label>
                    <Switch
                      id="app-notifications"
                      checked={editedUserData.notifications.app}
                      onCheckedChange={() => handleNotificationToggle('app')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-notifications">Event Reminders</Label>
                    <Switch
                      id="event-notifications"
                      checked={editedUserData.notifications.events}
                      onCheckedChange={() => handleNotificationToggle('events')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message-notifications">Message Notifications</Label>
                    <Switch
                      id="message-notifications"
                      checked={editedUserData.notifications.messages}
                      onCheckedChange={() => handleNotificationToggle('messages')}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy</CardTitle>
                  <CardDescription>Manage your privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <select
                      id="profile-visibility"
                      className="px-3 py-1.5 rounded-md border"
                      value={editedUserData.privacy.profileVisibility}
                      onChange={(e) => {
                        setEditedUserData({
                          ...editedUserData,
                          privacy: {
                            ...editedUserData.privacy,
                            profileVisibility: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-activity">Show Activity</Label>
                    <Switch
                      id="show-activity"
                      checked={editedUserData.privacy.showActivity}
                      onCheckedChange={() => handlePrivacyToggle('showActivity')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-location">Show Location</Label>
                    <Switch
                      id="show-location"
                      checked={editedUserData.privacy.showLocation}
                      onCheckedChange={() => handlePrivacyToggle('showLocation')}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex gap-2" onClick={() => (window.location.href = '/#')}>
                    <LogOut className="h-4 w-4" /> Log Out
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Events</CardTitle>
                  <CardDescription>Events you've attended or registered for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Upcoming Events</h3>
                    <div className="border rounded-lg p-3">
                      <p className="font-medium">Swedish Fika & Language Exchange</p>
                      <p className="text-sm text-muted-foreground">Tomorrow at 4:00 PM</p>
                      <p className="text-sm text-muted-foreground">Espresso House, Drottninggatan</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="font-medium">Weekend Hiking in Söderåsen</p>
                      <p className="text-sm text-muted-foreground">Saturday at 10:00 AM</p>
                      <p className="text-sm text-muted-foreground">Söderåsen National Park</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Past Events</h3>
                    <div className="border rounded-lg p-3 opacity-70">
                      <p className="font-medium">International Cooking Workshop</p>
                      <p className="text-sm text-muted-foreground">Last Sunday</p>
                    </div>
                    <div className="border rounded-lg p-3 opacity-70">
                      <p className="font-medium">Tech Meetup: Web Development</p>
                      <p className="text-sm text-muted-foreground">April 27, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Friends</CardTitle>
                  <CardDescription>People you've connected with</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Johan Svensson</p>
                          <p className="text-xs text-muted-foreground">Connected 2 weeks ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" />
                          <AvatarFallback>ML</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Maria Lindberg</p>
                          <p className="text-xs text-muted-foreground">Connected 1 month ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" />
                          <AvatarFallback>EN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Erik Nilsson</p>
                          <p className="text-xs text-muted-foreground">Connected 2 months ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
