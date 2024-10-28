/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User data to be safely used on the client
 */
export type ITeamMember = {
    email: string;
    /**
     * The name of the user
     */
    name: string;
    team: string;
    /**
     * Indicates whether or not this user is an owner of the team
     */
    isOwner: boolean;
};

