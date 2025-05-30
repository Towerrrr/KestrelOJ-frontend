/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Question } from '../models/Question';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionInnerControllerService {
    /**
     * getById
     * @param questionId questionId
     * @returns Question OK
     * @throws ApiError
     */
    public static getByIdUsingGet(
        questionId: number,
    ): CancelablePromise<Question> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/inner/get/id',
            query: {
                'questionId': questionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
