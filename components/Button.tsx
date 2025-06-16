"use client";

import React, { useState, useEffect } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { deletePost } from "@/app/actions/Skillpost";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Fixed import
import { Trash2 } from "lucide-react";

interface postprop {
  text: string;
  postId: string;
  authorId: string;
}

const Button = ({ text, postId, authorId }: postprop) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Move localStorage access to useEffect to avoid SSR issues
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as JwtPayload;
        if (decoded && decoded.id) {
          setUserId(decoded.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token");
      }
    }
  }, []);

  const postDelete = async () => {
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    setIsDeleting(true);
    
    try {
      const res = await deletePost(postId, userId);
      
      if (!res) {
        toast.error("Delete failed");
        return;
      }
      
      if (!res.success) {
        toast.error("Delete failed");
        return;
      }

      toast.success("Post Deleted");
      
      // Navigate after successful deletion
      setTimeout(() => {
        router.push("/posts");
      }, 1000);
      
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  // Don't render anything if userId is not loaded yet
  if (userId === null) {
    return null;
  }

  return userId === authorId ? (
    <button
      className="cursor-pointer p-2 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      type="button"
      onClick={postDelete}
      disabled={isDeleting}
      aria-label="Delete post"
    >
      <Trash2 
        color="red" 
        size={20}
        className={isDeleting ? "animate-pulse" : ""}
      />
      {text && <span className="ml-2 text-red-600">{text}</span>}
    </button>
  ) : null;
};

export default Button;