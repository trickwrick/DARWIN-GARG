'use server';

import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function addFAQ(formData: FormData) {
  try {
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    
    if (!question || !answer) {
      return { success: false, message: 'Question and answer are required.' };
    }

    const client = await clientPromise;
    const db = client.db('godsbook');
    
    const newFAQ = {
      question,
      answer,
      createdAt: new Date(),
    };

    await db.collection('faqs').insertOne(newFAQ);

    revalidatePath('/');
    revalidatePath('/admin/faqs');

    return { success: true, message: 'FAQ added successfully!' };
  } catch (error) {
    console.error('Error adding FAQ:', error);
    return { success: false, message: 'Failed to add FAQ.' };
  }
}

export async function getFAQs() {
  try {
    const client = await clientPromise;
    const db = client.db('godsbook');
    
    // Sort by creation date
    const faqs = await db.collection('faqs').find({}).sort({ createdAt: 1 }).toArray();
    
    return faqs.map(faq => ({
      _id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
    }));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function getFAQById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db('godsbook');
    const faq = await db.collection('faqs').findOne({ _id: new ObjectId(id) });
    
    if (!faq) return null;

    return {
      _id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
    };
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return null;
  }
}

export async function updateFAQ(id: string, formData: FormData) {
  try {
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    
    if (!question || !answer) {
      return { success: false, message: 'Question and answer are required.' };
    }

    const client = await clientPromise;
    const db = client.db('godsbook');
    
    await db.collection('faqs').updateOne(
      { _id: new ObjectId(id) },
      { $set: { question, answer } }
    );

    revalidatePath('/');
    revalidatePath('/admin/faqs');

    return { success: true, message: 'FAQ updated successfully!' };
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return { success: false, message: 'Failed to update FAQ.' };
  }
}

export async function deleteFAQ(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db('godsbook');
    
    await db.collection('faqs').deleteOne({ _id: new ObjectId(id) });

    revalidatePath('/');
    revalidatePath('/admin/faqs');

    return { success: true, message: 'FAQ deleted successfully!' };
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return { success: false, message: 'Failed to delete FAQ.' };
  }
}
