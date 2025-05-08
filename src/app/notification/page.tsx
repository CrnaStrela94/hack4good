'use client';

import { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, MapPin, User, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import AppLayout from '@/src/app/layout-with-nav';

// Mock notification data
const notifications = [
  {
    id: 1,
    type: 'event_reminder',
    title: 'Swedish Fika & Language Exchange',
    message: 'Event starting in 30 minutes at Espresso House, Drottninggatan',
    time: '2:30 PM Today',
    image:
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    eventId: 1,
    read: false,
    urgent: true,
  },
  {
    id: 2,
    type: 'new_message',
    title: 'New message from Anna',
    message: 'Looking forward to seeing you at the event tomorrow!',
    time: 'Yesterday at 6:45 PM',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    read: true,
    urgent: false,
  },
  {
    id: 3,
    type: 'friend_request',
    title: 'Johan wants to connect',
    message: 'Johan Svensson sent you a friend request',
    time: '2 days ago',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    read: false,
    urgent: false,
  },
  {
    id: 4,
    type: 'event_reminder',
    message: "Don't forget the Weekend Hiking in Söderåsen event this Saturday",
    title: 'Weekend Hiking in Söderåsen',
    time: '3 days ago',
    image:
      'https://images.unsplash.com/photo-1723023322463-f355990a2800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    eventId: 2,
    read: true,
    urgent: false,
  },
  {
    id: 5,
    type: 'event_invitation',
    title: 'International Food Festival',
    message: 'Maria invited you to International Food Festival',
    time: '4 days ago',
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    eventId: 4,
    read: true,
    urgent: false,
  },
];

export default function NotificationsPage() {
  const [openNotifications, setOpenNotifications] = useState<number[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<any>(null);
  const [notificationsList, setNotificationsList] = useState(notifications);

  // Simulate an incoming notification
  useEffect(() => {
    const timer = setTimeout(() => {
      const upcomingEvent = {
        id: 6,
        type: 'event_reminder',
        title: 'Swedish Fika & Language Exchange',
        message: 'Your event is about to start in 15 minutes!',
        time: 'Just now',
        image:
          'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
        eventId: 1,
        read: false,
        urgent: true,
      };

      setNotificationsList((prev) => [upcomingEvent, ...prev]);
      setCurrentAlert(upcomingEvent);
      setAlertOpen(true);
    }, 5000); // Show alert after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: number) => {
    setNotificationsList(
      notificationsList.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
    );
  };

  const toggleNotification = (id: number) => {
    if (openNotifications.includes(id)) {
      setOpenNotifications(openNotifications.filter((openId) => openId !== id));
    } else {
      setOpenNotifications([...openNotifications, id]);
      markAsRead(id);
    }
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(notificationsList.filter((notification) => notification.id !== id));
  };

  return (
    <AppLayout>
      <div className="pb-20">
        <header className="px-4 pt-6 pb-3 border-b sticky top-0 bg-background z-10">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </header>

        <div className="p-4 space-y-4">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* All Notifications Tab */}
            <TabsContent value="all" className="mt-4 space-y-4">
              {notificationsList.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No notifications yet</p>
                  </CardContent>
                </Card>
              ) : (
                notificationsList.map((notification) => (
                  <Card key={notification.id} className={notification.read ? 'opacity-80' : ''}>
                    <CardHeader className="px-4 py-3 flex flex-row items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={notification.image} />
                            <AvatarFallback>
                              {notification.type === 'event_reminder'
                                ? 'EV'
                                : notification.type === 'new_message'
                                ? 'MS'
                                : 'FR'}
                            </AvatarFallback>
                          </Avatar>
                          {!notification.read && (
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </CardHeader>
                    <div onClick={() => toggleNotification(notification.id)}>
                      <CardContent className="px-4 py-2">
                        <p className="text-sm">{notification.message}</p>
                      </CardContent>
                      {openNotifications.includes(notification.id) && (
                        <div className="px-4 pb-3">
                          {notification.type === 'event_reminder' && (
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{notification.time}</span>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  View Event Details
                                </Button>
                              </div>
                            </div>
                          )}
                          {notification.type === 'new_message' && (
                            <div className="flex justify-end mt-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                Reply
                              </Button>
                            </div>
                          )}
                          {notification.type === 'friend_request' && (
                            <div className="flex justify-end gap-2 mt-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                Ignore
                              </Button>
                              <Button size="sm" className="text-xs">
                                Accept
                              </Button>
                            </div>
                          )}
                          {notification.type === 'event_invitation' && (
                            <div className="flex justify-end gap-2 mt-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                Decline
                              </Button>
                              <Button size="sm" className="text-xs">
                                Accept Invitation
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Unread Tab */}
            <TabsContent value="unread" className="mt-4 space-y-4">
              {notificationsList.filter((n) => !n.read).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No unread notifications</p>
                  </CardContent>
                </Card>
              ) : (
                notificationsList
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <Card key={notification.id}>
                      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={notification.image} />
                              <AvatarFallback>
                                {notification.type === 'event_reminder'
                                  ? 'EV'
                                  : notification.type === 'new_message'
                                  ? 'MS'
                                  : 'FR'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </CardHeader>
                      <CardContent className="px-4 py-2">
                        <p className="text-sm">{notification.message}</p>
                      </CardContent>
                    </Card>
                  ))
              )}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-4 space-y-4">
              {notificationsList.filter((n) => n.type.includes('event')).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No event notifications</p>
                  </CardContent>
                </Card>
              ) : (
                notificationsList
                  .filter(
                    (notification) => notification.type === 'event_reminder' || notification.type === 'event_invitation'
                  )
                  .map((notification) => (
                    <Card key={notification.id} className={notification.read ? 'opacity-80' : ''}>
                      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={notification.image} />
                              <AvatarFallback>EV</AvatarFallback>
                            </Avatar>
                            {!notification.read && (
                              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </CardHeader>
                      <CardContent className="px-4 py-2">
                        <p className="text-sm">{notification.message}</p>
                      </CardContent>
                    </Card>
                  ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Alert Dialog for Event Reminders */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Event Reminder</AlertDialogTitle>
              <AlertDialogDescription>{currentAlert?.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlertOpen(false)}>Dismiss</AlertDialogCancel>
              <AlertDialogAction>View Event</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
