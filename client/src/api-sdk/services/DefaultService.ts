/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Subscription } from '../models/Subscription';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
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
