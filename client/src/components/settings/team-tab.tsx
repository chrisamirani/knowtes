'use client';

import React, { useState } from 'react';
import API from '@/api';

import { useKnowtesStore } from '@/lib/store';
import { toast } from '@/lib/ToastProvider';

import MemberCard from '../member-card';
import { Button } from '../plate-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../plate-ui/card';
import { Input } from '../plate-ui/input';
import { Label } from '../plate-ui/label';
import { TabsContent } from '../plate-ui/tabs';

export default function TeamTab() {
  const [email, setEmail] = useState('');
  const { members } = useKnowtesStore();

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await API.UsersService.invite({ email });
      toast(
        'Invitation sent. Please ask your team member to check their email',
        { type: 'success' }
      );
    } catch (e: unknown) {
      console.log(e);
      toast(
        'Could not sent invite. Try again later or contact us if you keep having issues.',
        { type: 'warning' }
      );
    }
  };

  return (
    <TabsContent value="team">
      <form onSubmit={handleInvite}>
        <Card>
          <CardHeader>
            <CardTitle>Team settings</CardTitle>
            <CardDescription>
              You can edit your team details and invite new members here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={({ target }) => setEmail(target.value)}
                type="email"
                required
                inputMode="email"
                value={email}
                id="email"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Invite</Button>
          </CardFooter>
        </Card>
      </form>
      <Card className="mt-2 ">
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>You are working with these members.</CardDescription>
        </CardHeader>
        <CardContent className="max-h-48 scroll-m-0 space-y-2 overflow-y-scroll">
          {members.map((member) => (
            <MemberCard member={member} />
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
