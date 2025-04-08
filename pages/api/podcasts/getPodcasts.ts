import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://oeiydstmukmoliycaipe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9laXlkc3RtdWttb2xpeWNhaXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NTg1MzEsImV4cCI6MjAyOTUzNDUzMX0.BZtDXl_yVS9T4CHT4P6PcwRoh8pfrziky1ROxi83M7I"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("Podcast").select();
      console.log("getting podcasts");
      console.log(data);

      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occured." });
    }
  }
}
