import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.pixabay.com',
      'res.cloudinary.com',
      'imgur.com',
      'i.imgur.com',
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      's3.amazonaws.com',
      'cdn.discordapp.com',
      'media.istockphoto.com',
      'staticflickr.com',
      'cricket.com'     // Example from your previous error
      
    ],
  }
};

export default nextConfig;
