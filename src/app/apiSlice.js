// https://redux-toolkit.js.org/rtk-query/overview
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Config
import { githubUsername } from "../config";

const token = "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";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
    getUsers: builder.query({
      query: () => `/users/${githubUsername}`,
    }),
    // https://docs.github.com/en/rest/users/social-accounts?apiVersion=2022-11-28#list-social-accounts-for-a-user
    getSocials: builder.query({
      query: () => `/users/${githubUsername}/social_accounts`,
    }),
    // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
    getProjects: builder.query({
      query: () => `/users/${githubUsername}/repos`,
    }),
  }),
});

export const { useGetUsersQuery, useGetSocialsQuery, useGetProjectsQuery } = apiSlice;