import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uri = "http://localhost:3001";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: uri, credentials: 'include' }),
  //credentials: 'include' pour qu'on puisse avoir accès au jwt dans les cookies
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
       console.log(response)
        return response;
      },
    }),
    logout: builder.query({
      query: () => "/logout",
    }),
  }),
});
//endpoint logout ne fonctionne pas car on a doit sans doute lui fournir le jeton lors de la requete?
export const { useLoginMutation, useLogoutQuery } = authApi;
