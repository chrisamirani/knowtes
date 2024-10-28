'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import API from '@/api';

import { toast } from '@/lib/ToastProvider';
import { Button } from '@/components/plate-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/plate-ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/plate-ui/dialog';
import { Input } from '@/components/plate-ui/input';
import { Label } from '@/components/plate-ui/label';

export default function MemberSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      API.OpenAPI.TOKEN = token;
      await API.UsersService.signUpTeamMember({
        name,
        email,
        password,
      });
      toast('Success! Please check your email shortly to login.', {
        type: 'success',
      });
      resetForm();
    } catch (e: unknown) {
      console.log(e);
      toast('Signup was unsuccessful. Please try again later.', {
        type: 'error',
      });
    }
  };

  const params = useSearchParams();
  useEffect(() => {
    setToken(params.get('t') ?? '');
    setEmail(params.get('email') ?? '');
  }, [params]);
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-[400px]">
        <DialogTitle></DialogTitle>
        <form onSubmit={handleSignup}>
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                We&apos;re excited you&apos;re joining us!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={true}
                  onChange={({ target }) => setEmail(target.value)}
                  type="email"
                  required
                  inputMode="email"
                  value={email}
                  id="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={({ target }) => setName(target.value)}
                  type="text"
                  required
                  autoCorrect="false"
                  inputMode="text"
                  value={name}
                  id="name"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={({ target }) => setPassword(target.value)}
                  id="password"
                  required
                  value={password}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Signup</Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
