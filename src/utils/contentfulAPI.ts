import { BlogPostType } from "@/components/blog/BlogCardPage";
import { createClient, EntryCollection, Entry } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export const getAllBlogPosts = async (): Promise<
  EntryCollection<BlogPostType>
> => {
  const res = await client.getEntries<BlogPostType>({
    content_type: "blogPost",
  });

  return res;
};

export const getBlogBySlug = async (
  slug: string
): Promise<Entry<BlogPostType> | null> => {
  const query: { content_type: string; "fields.slug": string; limit: number } = {
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  };

  const res = await client.getEntries<BlogPostType>(query);
  return res.items.length > 0 ? res.items[0] : null;
};
