/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailField } from './EmailField';
import type { TDocumentId } from './TDocumentId';
export type IUser = {
    /**
     * The name of the user
     */
    name: string;
    /**
     * A  password  following criteria :
     * - At least 8 characters long (you can adjust this as needed).
     * - At least one uppercase letter (A-Z).
     * - At least one lowercase letter (a-z).
     * - At least one digit (0-9).
     * - At least one special character (e.g.,
     */
    password: string;
    teamId?: TDocumentId;
    email: EmailField;
};

