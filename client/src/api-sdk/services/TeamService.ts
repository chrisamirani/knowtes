/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ITeamMember } from '../models/ITeamMember';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamService {
    /**
     * get team members
     * @returns ITeamMember Ok
     * @throws ApiError
     */
    public static getMembers(): CancelablePromise<Array<ITeamMember>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/team/members',
        });
    }
}
