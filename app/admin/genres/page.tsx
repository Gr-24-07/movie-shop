"use client";

import { AddGenreAction,AddGenreFailure  } from "@/app/actions/genres";
import AddButton from "./addbutton";

import { useRef , useState} from "react";
import FormError from "@/app/components/form-error";
import GenreList from "./genre-list";


export default function AddGenrePage() {
    const forRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<AddGenreFailure["errors"] | undefined>();
   
    async function action (formData: FormData) {
        const result = await AddGenreAction(formData);

        if (result.success) {
          forRef.current?.reset();  
          setErrors(undefined);
          return;
        }
        else{
            setErrors(result.errors);
        }  
    }

    return (
        <main className="container py-10 px-20 bg-gray-200 shadow-md rounded-lg ">
            <div className="bg-blue-900 p-4 rounded-lg font-bold text-white">
                <h1 className="text-center text-md">Movie Genre</h1>
            </div>

            <form ref={forRef} className="p-6 mt-6 space-y-6 bg-gray-50 rounded-lg shadow-inner" action={AddGenreAction }>
                <div className="flex flex-col">
                    <label
                        htmlFor="title"
                        className="text-gray-700 font-medium mb-2"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-400 "
                    />
                    <FormError errors={errors?.name?._errors} />
                </div>

                <div className="flex justify-end">
                   <AddButton /> 
                </div>

            </form>
            
            < GenreList />
        </main>
    );
}
