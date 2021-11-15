class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl
  }

  async createPost(post) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post)
      })
      return useRequest(request)
    } catch (e) {
      console.error(e)
    }
  }

  async fetchPosts() {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'get'
      })
      return useRequest(request)
    } catch (e) {
      console.error(e)
    }
  }

  async fetchPostsById(post) {
    try {
      const request = new Request(this.url + '/posts/' + post + '.json', {
        method: 'get'
      })
      return useRequest(request)
    } catch (e) {
      console.error(e)
    }
  }

}

async function useRequest(request) {
  const response = await fetch(request)
  return await response.json()
}

export const apiService = new ApiService('https://test-70100.firebaseio.com')