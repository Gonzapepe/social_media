import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  commentsFromPosts?: Maybe<Array<Comment>>;
  me?: Maybe<User>;
  users?: Maybe<Array<User>>;
  bye: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryCommentsFromPostsArgs = {
  postId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  creatorId: Scalars['String'];
  creator: User;
  upvotes: Array<Upvote>;
  votes: Scalars['Float'];
  comments: Array<Comment>;
  commentaries: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  UpdatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  posts: Array<Post>;
  upvotes: Array<Upvote>;
  comments: Array<Comment>;
  tokenVersion: Scalars['Float'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type Upvote = {
  __typename?: 'Upvote';
  value: Scalars['Float'];
  userId: Scalars['String'];
  user: User;
  postId: Scalars['String'];
  post: Post;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  text: Scalars['String'];
  creatorId: Scalars['String'];
  user: User;
  postId: Scalars['String'];
  post: Post;
  createdAt: Scalars['String'];
  UpdatedAt: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  postComment: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  vote: Scalars['Boolean'];
  register: UserResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  deleteUser: DeleteResponse;
  profilePicture: ProfileResponse;
};


export type MutationPostCommentArgs = {
  commentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationProfilePictureArgs = {
  file: Scalars['Upload'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorType>>;
  user?: Maybe<User>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<ErrorType>>;
  user?: Maybe<User>;
  accessToken: Scalars['String'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  errors?: Maybe<Array<ErrorType>>;
  deleted: Scalars['Boolean'];
};


export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  errors?: Maybe<Array<ErrorType>>;
  filename: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'path' | 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id' | 'created_at'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'path' | 'message'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'id'>
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'votes' | 'commentaries' | 'title' | 'text' | 'creatorId' | 'createdAt' | 'UpdatedAt'>
  )>> }
);


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      username
      email
      id
    }
    errors {
      path
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($data: RegisterInput!) {
  register(data: $data) {
    user {
      username
      email
      id
      created_at
    }
    errors {
      path
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    email
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    votes
    commentaries
    title
    text
    creatorId
    votes
    createdAt
    UpdatedAt
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;