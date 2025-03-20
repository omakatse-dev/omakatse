import { createClient } from 'contentful';

const spaceId = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export const getAllBlogPosts = async () => {
  const res = await client.getEntries({
    content_type: 'blogPost',  
  });

  return res.items.map((item) => ({
    blogId: item.fields.blogId,  // Blog post ID
    categoryTag: item.fields.categoryTag,  // Category tag
    title: item.fields.title,  // Title of the blog post
    editedDate: item.fields.editedDate,  // Edited date
    postedDate: item.fields.postedDate,  // Posted date
    readDuration: item.fields.readDuration,  // Read duration
    author: item.fields.author,  // Author of the blog post
    imageHeader: item.fields.imageHeader,  // Image URL (if available)
    description: item.fields.description,  // Description (RichText field)
    summary: item.fields.summary,  // Summary text
  }));
};