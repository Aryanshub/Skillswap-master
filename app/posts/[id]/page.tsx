import React from "react";
import { FetchPostById } from "@/app/actions/Skillpost";
import Link from "next/link";
import PostInteraction from "@/components/PostInteraction";
import Button from "@/components/Button";


export default async function PostDetailPage({ params }: any) {
  const post = await FetchPostById(params.id);

  if (!post || !post.post) {
    return (
      <div className="max-w-3xl mx-auto pt-24 px-6">
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
          <div className="text-4xl mb-4">🚫</div>
          <h1 className="text-xl font-semibold text-red-600 mb-2">
            Post Not Found
          </h1>
          <p className="text-red-500 mb-4">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/posts" 
            className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const {
    id,
    title,
    content,
    author,
    authorId,
    comments = [],
    likes = [],
    mediaUrl,
  } = post.post;

  return (
    <div className="max-w-3xl mx-auto pt-24 px-6 pb-10">
      <article className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        {/* Header Section */}
        <header className="border-b pb-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                {title}
              </h1>
              <div className="flex items-center text-sm text-gray-600">
                <span>By</span>
                <span className="font-medium text-gray-900 ml-1">
                  {author?.name || "Anonymous"}
                </span>
              </div>
            </div>
            <Button text="Delete Post" postId={id} authorId={authorId} />
          </div>
        </header>

        {/* Media Section */}
        {mediaUrl && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={mediaUrl}
              alt={`Media for ${title}`}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Interaction Section */}
        <div className="pt-6 border-t">
          <PostInteraction
            postId={id}
            userId={authorId}
            comments={comments}
          />
        </div>
      </article>

      {/* Navigation */}
      <div className="mt-8">
        <Link 
          href="/posts" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to all posts
        </Link>
      </div>
    </div>
  );
}