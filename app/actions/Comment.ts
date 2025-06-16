"use server";
import prisma from "@/db";

interface commenttype {
  userId: string;
  postId: string;
  newComment: string;
}

interface deletetype {
  id: string;
  userId: string;
}

export const CreateComment = async ({
  userId,
  postId,
  newComment,
}: commenttype) => {
  try {
    if (!userId || !postId || !newComment) {
      return {
        success: false,
        message: "User ID, Post ID, and Comment content are required.",
      };
    }

    const comment = await prisma.comment.create({
      data: {
        content: newComment,
        authorId: userId,
        postId,
      },
      select: {
        id: true,
        content: true,
        authorId:true,
        author: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });

    return {
      success: true,
      message: "Comment created successfully.",
      comment,
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return {
      success: false,
      message:
        "An error occurred while creating the comment. Please try again.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};


export const deleteComment = async ({ userId, id }: deletetype) => {
  try {
    if (!userId || !id) {
      console.warn("Missing userId or comment ID");
      return {
        success: false,
        message: "Invalid request. User ID or Comment ID missing.",
      };
    }

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found.",
      };
    }

    if (userId !== comment.authorId) {
      return {
        success: false,
        message: "You are not authorized to delete this comment.",
      };
    }

    await prisma.comment.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Comment deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: "An error occurred while deleting the comment. Please try again later.",
    };
  }
};
