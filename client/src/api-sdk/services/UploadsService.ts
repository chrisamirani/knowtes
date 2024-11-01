/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadsService {
    /**
     * Upload files
     * @param formData
     * @returns string Ok
     * @throws ApiError
     */
    public static uploadFile(
        formData: {
            fileType: string;
            file: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/uploads/uploadFile',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
