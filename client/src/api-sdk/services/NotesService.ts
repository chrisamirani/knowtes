/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { INote } from '../models/INote';
import type { Omit_INote_body_ } from '../models/Omit_INote_body_';
import type { TDocumentId } from '../models/TDocumentId';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotesService {
    /**
     * Initialized an empty note
     * @returns TDocumentId Ok
     * @throws ApiError
     */
    public static init(): CancelablePromise<TDocumentId> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notes/init',
        });
    }
    /**
     * Update a note
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static update(
        requestBody: INote,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/notes/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get recent 10 notes' titles
     * @returns Omit_INote_body_ Ok
     * @throws ApiError
     */
    public static getRecent(): CancelablePromise<Array<Omit_INote_body_>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notes/recent',
        });
    }
}
