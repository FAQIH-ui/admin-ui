// src/Service.jsx
export const getPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    
    return posts.map((post) => ({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    }));
  } catch (error) {
    console.error("[Services] Gagal mengambil data posts:", error.message);
    throw error;
  }
};