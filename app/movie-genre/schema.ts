
import { z } from "zod";

export const AddGenreSchema = z.object({
    name:      z.string().min(1, "please Enter the Name of the Movie").trim(),
    
    

});