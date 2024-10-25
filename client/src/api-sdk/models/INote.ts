/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TDocumentId } from './TDocumentId';
import type { TNoteBody } from './TNoteBody';
export type INote = {
    id?: TDocumentId;
    /**
     * The title of the note.
     */
    title: string;
    /**
     * This is the content value compatible with PlateJS framework
     * which can be used in the PlateEditor to be rendered.
     */
    body: TNoteBody;
};

