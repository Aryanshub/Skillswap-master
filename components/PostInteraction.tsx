"use client";

import { CreateComment, deleteComment } from "@/app/actions/Comment";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Trash2, 
  User,
  Calendar,
  Clock,
  Link2
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";

interface CommentsType {
  id: string;
  content: string;
  authorId: string;
  author: {
    name: string;
  };
  createdAt: Date;
}

interface PostInteractionProps {
  postId: string;
  userId: string;
  comments: CommentsType[];
}

export default function PostInteraction({
  postId,
  userId,
  comments,
}: PostInteractionProps) {
  const [allComment, setAllComment] = useState(comments);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as JwtPayload;
        if (decoded && decoded.id) {
          setLoggedInUser(decoded.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Authentication error");
      }
    }
  }, []);

  const likePost = () => {
    if (!loggedInUser) {
      toast.error("Please login to like posts");
      return;
    }

    setIsLiked(!isLiked);
    setLikes((prev) => isLiked ? prev - 1 : prev + 1);
    
    // TODO: Call backend to store like
    toast.success(isLiked ? "Like removed" : "Post liked!");
  };

  const postComment = async () => {
    if (!loggedInUser) {
      toast.error("Please login to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsPostingComment(true);

    try {
      const latestComment = await CreateComment({
        userId: loggedInUser,
        postId,
        newComment: newComment.trim(),
      });

      if (!latestComment || !latestComment.success || !latestComment.comment) {
        toast.error("Error publishing comment! Try again");
        return;
      }

      setNewComment("");
      setAllComment((prev) => [latestComment.comment, ...prev]);
      toast.success("Comment posted successfully!");

    } catch (error) {
      console.error("Comment error:", error);
      toast.error("Failed to post comment");
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!loggedInUser) {
      toast.error("Authentication required");
      return;
    }

    setDeletingCommentId(commentId);

    try {
      const res = await deleteComment({
        userId: loggedInUser,
        id: commentId,
      });

      if (!res.success) {
        toast.error(res.message || "Failed to delete comment");
        return;
      }

      setAllComment((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("Comment deleted successfully");

    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffMs = now.getTime() - commentDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return commentDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: commentDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (!loggedInUser) {
    return (
      <div className="space-y-6 mt-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center py-8">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
         <h3 className="text-lg font-medium text-gray-900 mb-2">
           <Link href="/auth/signin" >Login Required  </Link>
          </h3>
          <p className="text-gray-500">
            Please login to like posts and leave comments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Like Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <button
            onClick={likePost}
            className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isLiked
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
            }`}
          >
            <Heart 
              size={20} 
              className={`transition-all duration-300 ${
                isLiked 
                  ? "fill-current scale-110" 
                  : "group-hover:scale-110"
              }`}
            />
            <span className="font-medium">
              {isLiked ? "Liked" : "Like"}
            </span>
          </button>

          <div className="flex items-center space-x-2 text-gray-600">
            <Heart size={16} className="text-red-500" />
            <span className="text-sm font-medium">
              {likes > 0 ? `${likes} ${likes === 1 ? "like" : "likes"}` : "No likes yet"}
            </span>
          </div>
        </div>
      </div>

      {/* Comment Input Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full border-0 resize-none focus:outline-none text-gray-700 placeholder-gray-400"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isPostingComment}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {newComment.length}/500 characters
          </span>
          <button
            onClick={postComment}
            disabled={!newComment.trim() || isPostingComment}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              !newComment.trim() || isPostingComment
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-md hover:shadow-lg"
            }`}
          >
            {isPostingComment ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Post Comment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div 
          className="px-6 py-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => setShowComments(!showComments)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Comments ({allComment.length})
              </h3>
            </div>
            <div className={`transform transition-transform duration-200 ${showComments ? 'rotate-180' : ''}`}>
              ↓
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${
          showComments ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {allComment.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {allComment.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`p-6 hover:bg-gray-50 transition-all duration-200 transform ${
                    index === 0 ? 'animate-slideIn' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {comment.author?.name?.charAt(0).toUpperCase() || "A"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {comment.author?.name || "Anonymous"}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock size={12} />
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed ml-11">
                        {comment.content}
                      </p>
                    </div>

                    {loggedInUser === comment.authorId && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={deletingCommentId === comment.id}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                      >
                        {deletingCommentId === comment.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                        ) : (
                          <Trash2 
                            size={16} 
                            className="group-hover:scale-110 transition-transform duration-200" 
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No comments yet</p>
              <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}