/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
    userRoleEnum?: User.userRoleEnum;
};
export namespace User {
    export enum userRoleEnum {
        USER = 'USER',
        ADMIN = 'ADMIN',
        BAN = 'BAN',
    }
}

