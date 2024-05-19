
import { createMarketingAPI } from './marketing'
import { createPostsAPI } from './posts'
import { createUsersAPI } from './users'

export type APIResponse<T, U> = {
  success: boolean;
  data: T;
  error?: U;
}

export const createAPIClient = (apiURL: string) => {
  return {
    posts: createPostsAPI(apiURL),
    users: createUsersAPI(apiURL),
    marketing: createMarketingAPI(apiURL)
  }
}
