import React, { Suspense } from "react";
import PostCard from "@/components/PostCard";
import { FetchPost } from "../actions/Skillpost";
import Link from "next/link";

// Type definitions
interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

// Loading skeleton component
const PostsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

// Enhanced empty state component
const EmptyState = () => {
  return (
    <div className="col-span-full text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          No skill posts yet
        </h3>
        <p className="text-gray-500 mb-6">
          Be the first to share your skills with the community and start exchanging knowledge!
        </p>
        <Link 
          href="/create-post"
          className="inline-flex items-center bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors duration-200 font-medium"
        >
          <svg 
            className="mr-2 h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create First Post
        </Link>
      </div>
    </div>
  );
};

// Error boundary component
const ErrorState = ({ error }: { error: string }) => {
  return (
    <div className="col-span-full text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <svg 
            className="mx-auto h-16 w-16 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Something went wrong
        </h3>
        <p className="text-gray-500 mb-6">
          {error || "We couldn't load the posts. Please try again later."}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors duration-200 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

// Main posts list component
const PostsList = async () => {
  try {
    const posts: Post[] = await FetchPost();

    if (!posts || posts.length === 0) {
      return <EmptyState />;
    }

    return (
      <section 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Posts listing"
      >
        {posts.map((post: Post) => (
          <Link 
            href={`/posts/${post.id}`} 
            key={post.id}
            className="transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg"
            aria-label={`Read post: ${post.title} by ${post.author.name}`}
          >
            <PostCard
              id={post.id}
              title={post.title}
              content={post.content}
              authorName={post.author.name}
            />
          </Link>
        ))}
      </section>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <ErrorState error="Failed to load posts. Please try again later." />;
  }
};

// Main Posts page component
const Posts = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 pt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Skill Exchange Posts
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing skills shared by our community members. Find something you'd like to learn or share your expertise!
        </p>
      </div>

      {/* Posts Content with Suspense */}
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>

      {/* Call to Action Section */}
      <div className="text-center mt-16">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to share your skills?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our community and start exchanging knowledge with others. Teaching is the best way to learn!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/createpost"
              className="bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-colors duration-200 font-medium"
            >
              Share a Skill
            </Link>
            <Link
              href="/auth/signup"
              className="text-purple-700 px-8 py-3 border-2 border-purple-700 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Posts;