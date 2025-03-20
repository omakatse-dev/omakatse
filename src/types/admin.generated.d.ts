/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type GetCustomerByEmailQueryVariables = AdminTypes.Exact<{
  email: AdminTypes.Scalars['String']['input'];
}>;


export type GetCustomerByEmailQuery = { customers: { edges: Array<{ node: (
        Pick<AdminTypes.Customer, 'id'>
        & { orders: { edges: Array<{ node: { fulfillments: Array<{ fulfillmentLineItems: { edges: Array<{ node: { lineItem: (
                        Pick<AdminTypes.LineItem, 'id' | 'name'>
                        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, variant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'price'>> }
                      ) } }> } }> } }> } }
      ) }> } };

interface GeneratedQueryTypes {
  "\n  #graphql\n    query GetCustomerByEmail($email: String!) {\n      customers(first: 1, query: $email) {\n        edges {\n          node {\n            id\n            orders(first: 100, query: \"fulfillment_status:fulfilled\") {\n              edges {\n                node {\n                  fulfillments(first: 10) {\n                    fulfillmentLineItems(first: 10) {\n                      edges {\n                        node {\n                          lineItem {\n                            id\n                            image {\n                              url\n                            }\n                            name\n                            variant {\n                              price\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }": {return: GetCustomerByEmailQuery, variables: GetCustomerByEmailQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
