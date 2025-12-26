import { api } from ".";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // PRODUCTS
    getProducts: build.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Product"],
    }),

    createProduct: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // SALES 👇
    getSales: build.query({
      query: (params) => ({
        url: "/sales",
        params,
      }),
      providesTags: ["Sales"],
    }),

    createSale: build.mutation({
      query: (body) => ({
        url: "/sales",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sales", "Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSalesQuery,
  useCreateSaleMutation,
} = productsApi;
