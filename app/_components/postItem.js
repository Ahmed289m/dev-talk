import { Avatar, AvatarFallback, AvatarImage } from "../_components/avatar";
import { Badge } from "../_components/badge";

export default function PostItem({ post }) {
  return (
    <div className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <Avatar>
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${post.username}`}
          />
          <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post.username}</p>
          <p className="text-gray-500 text-sm">{post.postedAtAgo}</p>
        </div>
      </div>

      <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((tag, index) => (
          <Badge key={index} variant="outline" className="bg-gray-50">
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
  );
}
