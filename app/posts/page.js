import { Avatar, AvatarFallback, AvatarImage } from "../_components/avatar";
import { Badge } from "../_components/badge";
import { getPosts } from "../_lib/data-services";
import Link from "next/link";
import { Pencil } from "lucide-react";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white relative">
      <div className="flex">
        <main className="flex-1">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Home</h1>

            <div className="space-y-8">
              {posts?.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.postId}
                    className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${post.username}`}
                        />
                        <AvatarFallback>
                          {post.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.username}</p>
                        <p className="text-gray-500 text-sm">
                          {post.postedAtAgo}
                        </p>
                      </div>
                    </div>

                    <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-gray-500 text-sm gap-4">
                      <div className="flex items-center gap-1">
                        <span>{post.upVotes} upvotes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{post.commentsCount} comments</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No posts available.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      <Link
        href="/write-post"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-13 h-13 flex items-center justify-center shadow-lg hover:bg-green-600"
      >
        <Pencil className="w-5 h-5" />
      </Link>
    </div>
  );
}
