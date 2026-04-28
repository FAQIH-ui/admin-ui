import React, { useState, useEffect } from "react";
import PostCard from "./PostCard"; 
import { getPosts } from "./Service"; 

function Exercise() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        // Mengambil 20 data pertama sesuai contoh gambar dosen
        setPosts(data.slice(0, 20)); 
      } catch (error) {
        console.error("[Component] Gagal menampilkan data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Pastikan text-special-red2 sudah terdaftar di tailwind.config.js */}
      <h1 className="text-4xl font-bold text-center mb-12 text-special-red2">
        Post Cards
      </h1>
      
      {/* Grid: 1 kolom (HP), 2 kolom (Tablet), 4 kolom (Desktop) agar mirip foto dosen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
        {posts.map((post) => (
          <PostCard 
            key={post.id} // Key harus id unik agar state di dalam kartu tidak reset
            {...post} 
          />
        ))}
      </div>
    </div>
  );
}

export default Exercise;