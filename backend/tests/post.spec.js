import request from 'supertest'
import app from '../src/app.js'
describe('Posts API', () => {
  let postId = '6468026157c74389ef94309b'
  const searchQuery = 'Beauty'; // Replace with your desired search query

  /*describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'Example Title',
        message: 'Example Message',
        creator: 'Example Creator',
        tags: ['tag1', 'tag2'],
        selectedFile: 'https://example.com/image.jpg',
        likeCount: 0,
      };

      const response = await request(app).post('/api/posts').send(newPost);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(newPost.title);
      expect(response.body.message).toBe(newPost.message);
      expect(response.body.creator).toBe(newPost.creator);
      expect(response.body.tags).toEqual(newPost.tags);
      expect(response.body.selectedFile).toBe(newPost.selectedFile);
      expect(response.body.likeCount).toBe(newPost.likeCount);
      expect(response.body.createdAt).toBeDefined();
    }, 10000);
  });*/


    /* describe('GET /api/posts/', () => {
       it('should get all posts', async () => {
         const response = await request(app).get('/api/posts')
         expect(response.status).toBe(200)
         expect(response.body).toHaveProperty('message', 'Posts retrieved successfully')
         expect(response.body).toHaveProperty('data')
         expect(response.body.data).toBeInstanceOf(Array)
       }, 10000)
     })*/
    /* describe('GET /api/posts/:id', () => {
      it('should get a post', async () => {
        const response = await request(app).get(`/api/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      }, 10000);
    });*/

    /*describe('GET /api/posts', () => {
      it('should get posts by search query', async () => {
        
    
        const response = await request(app).get(`/api/posts?searchQuery=${searchQuery}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
      }, 10000);
    });*/
    

    /*describe('DELETE /api/posts/:id', () => {
      it('should delete a post', async () => {
        
    
        const response = await request(app).delete(`/api/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Post deleted successfully." });
      }, 10000);
    });*/
    
})
