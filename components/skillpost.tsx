'use client';

import { FormEvent, useState } from 'react';
import { SkillPost } from '@/app/actions/Skillpost';
import { InputElement } from './Signup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RichTextEditor } from './RichTextEditor';

export const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!content.trim() || content === '<p></p>') {
      newErrors.content = 'Content is required';
    } else if (content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    // Optional media URL validation
    if (mediaUrl && !isValidUrl(mediaUrl)) {
      newErrors.mediaUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Authentication failed! Please login to continue.');
      setLoading(false);
      router.push('/auth/signin');
      return;
    }

    try {
      const post = await SkillPost({ 
        title: title.trim(), 
        content: content.trim(), 
        mediaUrl: mediaUrl.trim() || undefined, 
        token 
      });
      
      if (!post) {
        toast.error('Error creating post. Please try again.');
        setLoading(false);
        return;
      }
      
      toast.success('Post created successfully! Redirecting...');
      
      // Reset form
      setTitle('');
      setContent('');
      setMediaUrl('');
      setErrors({});
      
      setTimeout(() => {
        router.push('/posts');
      }, 1000);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const handleMediaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(e.target.value);
    if (errors.mediaUrl) {
      setErrors(prev => ({ ...prev, mediaUrl: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Create a Mini Post
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <InputElement
            label="Title"
            inputname="title"
            type="text"
            value={title}
            handler={handleTitleChange}
            placeholder="Enter a catchy title..."
            maxLength={100}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            {title.length}/100 characters
          </p>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <RichTextEditor 
            content={content} 
            onChange={handleContentChange}
            placeholder="Write your post content here..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        <div>
          <InputElement
            label="Media URL"
            inputname="mediaUrl"
            type="url"
            value={mediaUrl}
            handler={handleMediaUrlChange}
            placeholder="https://example.com/image.jpg"
          />
          {errors.mediaUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.mediaUrl}</p>
          )}
          {mediaUrl && isValidUrl(mediaUrl) && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img 
                src={mediaUrl} 
                alt="Media preview" 
                className="max-w-full h-32 object-cover rounded border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            'Create Post'
          )}
        </button>
      </form>
    </div>
  );
};