import React, { useState } from 'react';

const PostCard = ({ title, body }) => {
  const [isClicked, setIsClicked] = useState(false);

return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md transition-all duration-300 
                    hover:scale-105 hover:border hover:border-red-200 hover:bg-pink-50">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-center mb-3 leading-tight">{title}</h2>
        <p className="text-gray-600 text-sm text-center">{body}</p>
      </div>

      <button
        type="button"
        onClick={() => setIsClicked(true)} // Mengubah state menjadi true selamanya
        className={`mt-6 py-2 px-4 rounded-md font-semibold transition-all duration-300
          ${isClicked 
            ? 'bg-[#b83016] text-white shadow-inner' // Warna Special Red2 tetap ada
            : 'bg-gray-500 text-white hover:bg-gray-600'}`}
      >
        {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
      </button>
    </div>
  );
};

export default PostCard;