import React from 'react';
import { Loader2 } from 'lucide-react';

export default function FullPageLoader({ message }: { message?: string }) {
  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center bg-secondary">
      <Loader2 className="size-12 animate-spin" />
      <p>{message ?? 'Please wait'}</p>
    </div>
  );
}
