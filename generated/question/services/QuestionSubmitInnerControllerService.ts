/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionSubmit } from '../models/QuestionSubmit';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionSubmitInnerControllerService {
    /**
     * getById
     * @param questionId questionId
     * @returns QuestionSubmit OK
     * @throws ApiError
     */
    public static getByIdUsingGet1(
        questionId: number,
    ): CancelablePromise<QuestionSubmit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/inner/question_submit/get/id',
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
    /**
     * updateById
     * @param questionSubmit questionSubmit
     * @returns boolean OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateByIdUsingPost(
        questionSubmit: QuestionSubmit,
    ): CancelablePromise<boolean | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/inner/question_submit/update',
            body: questionSubmit,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
