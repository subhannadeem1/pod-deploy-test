import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    
    // Get all podcast episodes.
    try {
      console.log(req.query);
      console.log(req.query.details);

	    const { data, error } = await supabase.from("podcast_episode").select().eq("podcast_id", req.query.details);

      const temp = data.sort((a, b) => {
        return a.number < b.number ? 1 : -1
      });

      return res.status(200).json(temp)
    
    } catch (err) {
      res.status(403).json({ err: "Error has occured." })
    }
  }
}