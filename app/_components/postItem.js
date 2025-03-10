import {
  Delete,
  Edit,
  Edit2,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  Vote,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/avatar";
import { Badge } from "../_components/badge";

export default function PostItem({ post }) {
  return (
    <div className=" border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <Avatar>
          <AvatarImage src={post.user.avatarUrl} />
          <AvatarFallback>{post.user.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between w-full">
          <div>
            <p className="font-medium">{post.user.userName}</p>
            <p className="text-gray-500 text-sm">{post.postedAtAgo}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.categories?.map((tag, index) => (
                <Badge key={index} className="bg-gray-50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Edit2 className="text-green-500" />

            <Delete className="text-green-500" />
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <div className="grid  gap-1 xl:grid-cols-2  overflow-hidden ">
        {post.postMedias.map((media) => {
          return (
            <img
              key={media.postMediaId}
              src={media.mediaUrl}
              className=" rounded-md w-full h-[280px]  object-fill lg:h-[400px]"
            />
          );
        })}
      </div>

      <div className="flex items-center text-gray-500 text-sm gap-4 pt-5">
        <div className="flex items-center gap-1">
          <span className="flex gap-1 items-center">
            <ThumbsUp className="w-4" />
            <div>{post.upVotes} upvotes</div>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex gap-1 items-center">
            <ThumbsDown className="w-4" />
            <div>{post.downVotes} downvotes</div>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>
            <MessageCircle className="w-4" />
          </span>
          <span>{post.comments} comments</span>
        </div>
      </div>
    </div>
  );
}
