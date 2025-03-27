import { BlogPostType } from "@/components/blog/BlogCardPage";
import { createClient, EntryCollection } from "contentful";

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

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
