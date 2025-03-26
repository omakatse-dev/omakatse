import { faqType } from "@/app/faqs/page";
import { BlogPostType } from "@/components/blog/BlogCardPage";
import { createClient, EntryCollection, Entry } from "contentful";

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;
const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  host: "cdn.contentful.com",
});
const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN!,
  host: "preview.contentful.com",
});

export const getAllBlogPosts = async (): Promise<
  EntryCollection<BlogPostType>
> => {
  const res = await client.getEntries<BlogPostType>({
    content_type: "blogPost",
  });

  return res;
};

export const getAllFaqs = async (): Promise<
  EntryCollection<faqType>
> => {
  const res = await client.getEntries<faqType>({
    content_type: "faq",
  });

  return res;
};

export const getBlogBySlug = async (
  slug: string,
  preview: string
): Promise<Entry<BlogPostType> | null> => {
  const query: { content_type: string; "fields.slug": string; limit: number } =
    {
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    };

  // If we're in preview mode, use the Preview API client
  const res = preview
    ? await previewClient.getEntries<BlogPostType>(query) // Preview API
    : await client.getEntries<BlogPostType>(query); // Delivery API

  // Return the first blog post found or null if not found
  return res.items.length > 0 ? res.items[0] : null;
};
