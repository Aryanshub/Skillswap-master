'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, Undo2, Redo2, Heading1 } from 'lucide-react';

export const RichTextEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none px-4 py-2 focus:outline-none min-h-[150px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-md border border-gray-300">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'text-blue-600 italic' : 'text-gray-700'}`}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'text-blue-600' : 'text-gray-700'}`}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'text-blue-600' : 'text-gray-700'}`}
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
        >
          <Redo2 size={18} />
        </button>
      </div>

      <EditorContent editor={editor} className="bg-white rounded-b-md" />
    </div>
  );
};
