import { useState } from 'react';
import API from '@/api';

import { toast } from '@/lib/ToastProvider';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/plate-ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/plate-ui/tabs';

import { Button, buttonVariants } from './plate-ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './plate-ui/dialog';
import { Input } from './plate-ui/input';
import { Label } from './plate-ui/label';

export function Authentication() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await API.UsersService.loginUserWithUserPass({
        email,
        password,
      });
      window.location.href = `/dashboard?token=${token}`;
    } catch (e: unknown) {
      console.log(e);
      toast('Login was unsuccessful. Please try again later.', {
        type: 'error',
      });
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.UsersService.createUnassignedUser({
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
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          size: 'default',
          variant: 'default',
        })}
      >
        Login
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogTitle></DialogTitle>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Welcome back!</CardDescription>
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
                  <Button type="submit">Login</Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
          <TabsContent value="signup">
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
                  <Button type="submit">Login</Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
