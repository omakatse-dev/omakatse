/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type GetCustomerOderByEmailQueryVariables = AdminTypes.Exact<{
  email: AdminTypes.Scalars['String']['input'];
}>;


export type GetCustomerOderByEmailQuery = { customers: { edges: Array<{ node: (
        Pick<AdminTypes.Customer, 'id'>
        & { orders: { edges: Array<{ node: { fulfillments: Array<{ fulfillmentLineItems: { edges: Array<{ node: { lineItem: (
                        Pick<AdminTypes.LineItem, 'id' | 'name'>
                        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, variant?: AdminTypes.Maybe<(
                          Pick<AdminTypes.ProductVariant, 'price'>
                          & { product: Pick<AdminTypes.Product, 'id'> }
                        )> }
                      ) } }> } }> } }> } }
      ) }> } };

export type GetPastOrdersByEmailQueryVariables = AdminTypes.Exact<{
  email: AdminTypes.Scalars['String']['input'];
}>;


export type GetPastOrdersByEmailQuery = { customers: { edges: Array<{ node: (
        Pick<AdminTypes.Customer, 'id'>
        & { orders: { nodes: Array<(
            Pick<AdminTypes.Order, 'id' | 'createdAt' | 'displayFulfillmentStatus'>
            & { netPaymentSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }
          )> } }
      ) }> } };

interface GeneratedQueryTypes {
  "\n  #graphql\n    query GetCustomerOderByEmail($email: String!) {\n      customers(first: 1, query: $email) {\n        edges {\n          node {\n            id\n            orders(first: 100, query: \"fulfillment_status:fulfilled\") {\n              edges {\n                node {\n                  fulfillments(first: 10) {\n                    fulfillmentLineItems(first: 10) {\n                      edges {\n                        node {\n                          lineItem {\n                            id\n                            image {\n                              url\n                            }\n                            name\n                            variant {\n                              price\n                              product {\n                                id\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }": {return: GetCustomerOderByEmailQuery, variables: GetCustomerOderByEmailQueryVariables},
  "\n    #graphql\n    query GetPastOrdersByEmail($email: String!) {\n      customers(first: 1, query: $email) {\n        edges {\n          node {\n            id\n            orders(first: 100) {\n              nodes {\n                id\n                createdAt\n                displayFulfillmentStatus\n                netPaymentSet {\n                  shopMoney {\n                    amount\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }": {return: GetPastOrdersByEmailQuery, variables: GetPastOrdersByEmailQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
