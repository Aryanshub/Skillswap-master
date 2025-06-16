"use server";
import prisma from "@/db";
import jwt, { JwtPayload } from "jsonwebtoken";

interface skillpost {
  title: string;
  content: string;
  mediaUrl?: string;
  token: string;
}

export const SkillPost = async ({
  title,
  content,
  mediaUrl,
  token,
}: skillpost) => {
  if (!title || !content || !token) {
    return { message: "All fields are required" };
  }
  const verifiedToken = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;
  if (!verifiedToken) {
    return { message: "Authentication failed" };
  }
  const userId = verifiedToken.id;
  try {
    const post = await prisma.skillPost.create({
      data: {
        title,
        content,
        mediaUrl,
        authorId: userId,
      },
      select: {
        title: true,
        content: true,
        mediaUrl: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    console.log("Post created successfully");
    return { message: "Post created successfully", post };
  } catch (error) {}
};

export const FetchPost = async () => {
  try {
    const posts = await prisma.skillPost.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        mediaUrl: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const FetchPostById = async (id: string) => {
  try {
    if (!id) {
      return { message: "Details not available" };
    }
    const post = await prisma.skillPost.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
        title: true,
        content: true,
        mediaUrl: true,
        createdAt: true,
        comments: {
          orderBy: {
            createdAt: "desc", // ✅ Latest comments first
          },
          include: {
            author: {
              select: {
                name: true, // ✅ Include author's name with each comment
              },
            },
          },
        },
        likes: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!post) return { post: null };
    return { post };
  } catch (error) {
    console.log(error);
    return { message: "Error fetching post" };
  }
};

export const deletePost = async (postId: string, userId: string) => {
  if (!postId || !userId) {
    return {
      success: false,
      message: "Authorization failed. Please try again.",
    };
  }

  try {
    const post = await prisma.skillPost.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found.",
      };
    }

    if (userId !== post.authorId) {
      return {
        success: false,
        message: "You are not authorized to delete this post.",
      };
    }

    const res = await prisma.comment.deleteMany({where:{postId}})
    if(!res){
      console.log("all comments not deleted");
      return
    }


    await prisma.skillPost.delete({
      where: {
        id: postId,
      },
    });

    return {
      success: true,
      message: "Post deleted successfully.",
    };
  } catch (error:any) {
    console.error("Delete post error:", error.message);
    return {
      success: false,
      message:
        "An error occurred while deleting the post. Please try again later.",
    };
  }
};
