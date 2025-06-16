"use client";

import { useMemo } from "react";

const stripHtml = (html: string): string => {
  if (typeof window === "undefined") return html;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

interface PostType {
  id: string;
  title: string;
  content: string;
  authorName: string;
}

export default function PostCard({ title, content, authorName, id }: PostType) {
  const plainContent = useMemo(() => stripHtml(content), [content]);

  const previewText =
    plainContent.length > 100 ? plainContent.slice(0, 100) + "..." : plainContent;

  return (
    <div className="shadow-lg hover:border-b rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{previewText}</p>
      </div>

      <p className="text-sm text-gray-500 mt-auto">
        By <span className="font-medium">{authorName || "Anonymous"}</span>
      </p>
    </div>
  );
}
