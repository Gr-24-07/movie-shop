import { z } from "zod";

export const AddGenreSchema = z.object({
    name: z.string().min(1, "Please enter the name of the genre").trim(),
});
