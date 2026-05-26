'use server';

import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function addBlog(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const file = formData.get('image') as File | null;
    
    if (!title || !excerpt || !file) {
      return { success: false, message: 'All fields are required.' };
    }

    let imageUrl = '';

    // Handle Image Upload
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '');
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
      
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const client = await clientPromise;
    const db = client.db('godsbook');
    
    const newBlog = {
      title,
      excerpt,
      image: imageUrl,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).toUpperCase(),
      createdAt: new Date(),
    };

    await db.collection('blogs').insertOne(newBlog);

    // Revalidate pages so new blogs appear immediately
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/blogs');

    return { success: true, message: 'Blog added successfully!' };
  } catch (error) {
    console.error('Error adding blog:', error);
    return { success: false, message: 'Failed to add blog.' };
  }
}

export async function getBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db('godsbook');
    
    const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray();
    
    return blogs.map(blog => ({
      _id: blog._id.toString(),
      title: blog.title,
      excerpt: blog.excerpt,
      image: blog.image,
      date: blog.date,
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db('godsbook');
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    
    if (!blog) return null;

    return {
      _id: blog._id.toString(),
      title: blog.title,
      excerpt: blog.excerpt,
      image: blog.image,
      date: blog.date,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const file = formData.get('image') as File | null;
    
    if (!title || !excerpt) {
      return { success: false, message: 'Title and excerpt are required.' };
    }

    const updateData: any = { title, excerpt };

    if (file && file.size > 0 && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '');
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(filepath, buffer);
      updateData.image = `/uploads/${filename}`;
    }

    const client = await clientPromise;
    const db = client.db('godsbook');
    
    await db.collection('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/blogs');

    return { success: true, message: 'Blog updated successfully!' };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, message: 'Failed to update blog.' };
  }
}

export async function deleteBlog(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db('godsbook');
    
    await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/blogs');

    return { success: true, message: 'Blog deleted successfully!' };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, message: 'Failed to delete blog.' };
  }
}

