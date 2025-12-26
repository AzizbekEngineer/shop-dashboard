import { api } from ".";

export const brandsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: (params) => ({
        url: "/brands",
        params,
      }),
      providesTags: ["Brand"],
    }),
    createBrand: build.mutation({
      query: (body) => ({
        url: "/brands",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: build.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: build.mutation({
      query: ({ id, body }) => ({
        url: `/brands/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandsApi;
