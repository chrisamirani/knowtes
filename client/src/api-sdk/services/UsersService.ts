/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IClientUser } from '../models/IClientUser';
import type { IUser } from '../models/IUser';
import type { Pick_IUser_email_or_password_ } from '../models/Pick_IUser_email_or_password_';
import type { TEmailField } from '../models/TEmailField';
import type { UserToken } from '../models/UserToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create a new user without an assigned team. This user can later create a team and invite others.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static createUnassignedUser(
        requestBody: IUser,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create a new user without an assigned team. This user can later create a team and invite others.
     * @param requestBody
     * @returns UserToken Ok
     * @throws ApiError
     */
    public static loginUserWithUserPass(
        requestBody: Pick_IUser_email_or_password_,
    ): CancelablePromise<UserToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get current user authenticated via Bearer JWT
     * @returns IClientUser Ok
     * @throws ApiError
     */
    public static me(): CancelablePromise<IClientUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * Invite a user to join your team
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static invite(
        requestBody: {
            email: TEmailField;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/invite',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Sign up authenticated team member (email invitation flow)
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static signUpTeamMember(
        requestBody: IUser,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/signup-teammate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
