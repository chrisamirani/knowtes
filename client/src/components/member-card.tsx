import React from 'react';
import { ITeamMember } from '@/api-sdk';

interface IProps {
  member: ITeamMember;
}
export default function MemberCard(props: IProps) {
  return (
    <div className="rounded-md p-3 shadow-sm">
      <p>
        {props.member.name} {props.member.isOwner ? '(Owner)' : ''}
      </p>
      {/* <button
        className={buttonVariants({ variant: 'destructive', size: 'xs' })}
      >
        <Icons.delete className="size-4" />
      </button> */}
    </div>
  );
}
