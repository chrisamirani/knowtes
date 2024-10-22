/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IClientUser } from '../models/IClientUser';
import type { IUser } from '../models/IUser';
import type { Pick_IUser_email_or_password_ } from '../models/Pick_IUser_email_or_password_';
import type { Subscription } from '../models/Subscription';
import type { UserToken } from '../models/UserToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
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
     * This service subscribes an email to receive development updates on Knowtes.
     * @param requestBody
     * @returns boolean Ok
     * @throws ApiError
     */
    public static subscribeToProgress(
        requestBody: Subscription,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/contact/subscribe',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
