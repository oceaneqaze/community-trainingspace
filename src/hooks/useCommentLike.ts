
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export function useCommentLike(commentId: string) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!commentId) return;
    // Get likes count
    const fetchLikes = async () => {
      const { count } = await supabase
        .from("comment_likes")
        .select("id", { count: "exact", head: true })
        .eq("comment_id", commentId);
      setLikesCount(count ?? 0);

      if (user) {
        const { data } = await supabase
          .from("comment_likes")
          .select("id")
          .eq("comment_id", commentId)
          .eq("user_id", user.id)
          .maybeSingle();
        setLiked(!!data);
      } else {
        setLiked(false);
      }
    };
    fetchLikes();
  }, [commentId, user]);

  const toggleLike = async () => {
    if (!user) return;
    setProcessing(true);

    if (liked) {
      // remove like
      await supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", user.id);
      setLikesCount((prev) => Math.max(0, prev - 1));
      setLiked(false);
    } else {
      await supabase
        .from("comment_likes")
        .insert({ comment_id: commentId, user_id: user.id });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
    setProcessing(false);
  };

  return { liked, likesCount, toggleLike, processing };
}
