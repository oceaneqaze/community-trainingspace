
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export function useVideoLike(videoId: string) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    // Fetch like count & if user liked
    const fetchLikes = async () => {
      const { count } = await supabase
        .from("video_likes")
        .select("id", { count: "exact", head: true })
        .eq("video_id", videoId);
      setLikesCount(count ?? 0);

      if (user) {
        const { data } = await supabase
          .from("video_likes")
          .select("id")
          .eq("video_id", videoId)
          .eq("user_id", user.id)
          .maybeSingle();
        setLiked(!!data);
      } else {
        setLiked(false);
      }
    };
    fetchLikes();
  }, [videoId, user]);

  const toggleLike = async () => {
    if (!user) return;
    setProcessing(true);

    if (liked) {
      // Remove the like
      await supabase
        .from("video_likes")
        .delete()
        .eq("video_id", videoId)
        .eq("user_id", user.id);
      setLikesCount((prev) => Math.max(0, prev - 1));
      setLiked(false);
    } else {
      // Add the like
      await supabase
        .from("video_likes")
        .insert({ video_id: videoId, user_id: user.id });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
    setProcessing(false);
  };

  return { liked, likesCount, toggleLike, processing };
}
