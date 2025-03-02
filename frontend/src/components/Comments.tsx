import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CommentsInterface,
  writeCommentInterface,
  writeCommentResponse,
} from "@/Interfaces/UserContextInterface";
import {
  deleteComment,
  getAllCommentsWithArticleId,
  writeComment,
} from "@/services/CommentsServices";
import { useParams, useRouter } from "next/navigation";
import { useUserInfo } from "@/context/UserContext";
import { Input } from "./ui/input";

export function Comments({
  commentsCount,
  text,
  setOpen,
  isOpen,
  setCommentCount,
}: CommentsInterface) {
  const { id } = useParams();
  const { currentUser } = useUserInfo();
  const [comments, setComments] = useState<writeCommentResponse[] | null>(null);
  const [newComment, setNewComment] = useState<writeCommentInterface>({
    articleId: Number(id),
    userId: currentUser.id,
    content: "",
  });
  const router = useRouter()

  // event handlers
  function handleSubmitComment() {
    if (newComment && newComment.content && newComment.articleId) {
      writeComment(newComment)
        .then((response) => {
          console.log(response.data);

          setNewComment({ ...newComment, content: "" });

          setComments((prevComments) =>
            prevComments ? [...prevComments, response.data] : [response.data]
          );

          setCommentCount((prevArticle) => {
            if (!prevArticle) return null;

            return {
              ...prevArticle,
              commentsCount: (prevArticle.commentsCount || 0) + 1,
            };
          });
        })
        .catch((err) => console.error(err));
    } else {
      console.error("Missing required data for comment");
    }
  }

  function handleCommentDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    commentId: number
  ) {
    e.preventDefault();
    e.stopPropagation();
    deleteComment(commentId)
      .then((response) => {
        console.log(response.data);

        // Filter out the deleted comment from the comments array
        setComments((prevComments) =>
          prevComments
            ? prevComments.filter((comment) => comment.id !== commentId)
            : null
        );

        // Update the comment count in the parent component
        setCommentCount((prevArticle) => {
          if (!prevArticle) return null;

          return {
            ...prevArticle,
            commentsCount: Math.max(0, (prevArticle.commentsCount || 0) - 1),
          };
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>, userId:number){
    e.preventDefault();
    e.stopPropagation()
    router.push(`/profile/${userId}`)
  }
  // event handlers

  useEffect(() => {
    getAllCommentsWithArticleId(Number(id))
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, isOpen]);

  return (
    <Sheet onOpenChange={setOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {text} <MessageCircle size={16} /> <span>{commentsCount}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>
            Join the conversation. Be respectful and thoughtful.
          </SheetDescription>
        </SheetHeader>

        {/* Comment submission form */}
        <div className="mt-6 flex items-start gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" alt="Current user" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              placeholder="Write a comment..."
              value={newComment?.content || ""}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              className="min-h-10"
            />
          </div>
          <Button onClick={handleSubmitComment} size="sm">
            <Send size={16} />
          </Button>
        </div>

        {/* Comments list */}
        <div className="mt-6 max-h-96 overflow-y-auto pr-2">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              onClick={(e) => handleCardClick(e,comment.userId)}
              className="mb-4 rounded-lg border p-3 relative cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.profileImage}
                      alt={comment.username}
                    />
                    <AvatarFallback>
                      {comment.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{comment.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <Button
                  
                  onClick={(e) => {
                    handleCommentDelete(e, comment.id);
                  }}
                  variant={"ghost"}
                  className={`p-1 h-8 ${currentUser.id !== comment.userId ? "hidden" : ""}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-sm">{comment.content}</p>
            </div>
          ))}
        </div>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
