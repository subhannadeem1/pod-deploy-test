import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    
    // Get transcript.
    try {

      console.log(req.query);

      const { data, error } = await supabase.from("Transcript").select().eq("episode", req.query.episode).eq("podcast", req.query.details);
      
      console.log(data);
      
      const temp = data.sort((a, b) => {
        return a.line > b.line ? 1 : -1
      });

      return res.status(200).json(temp)
    
    } catch (err) {
      res.status(403).json({ err: "Error has occured." })
    }
  }
}