'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPeople, createPerson, updatePerson, deletePerson } from '@/app/actions/people';

interface PeopleComponentProps {
  movies: {
    id: string;
    title: string;
  }[];
}

interface Person {
  id: string;
  name: string;
  role: 'Actor' | 'Director';
}

const personSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["Actor", "Director"]),
});

export default function PeopleComponent({ movies }: PeopleComponentProps) {
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [assignedPeople, setAssignedPeople] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const form = useForm<z.infer<typeof personSchema>>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      role: "Actor",
    },
  });

  const fetchAssignedPeople = async (movieId: string) => {
    if (!movieId) return;

    try {
      const result = await getPeople(movieId);
      if (result.success && result.people) {
        setAssignedPeople(result.people);
      } else {
        throw new Error(result.error || "Failed to fetch assigned people.");
      }
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : "An error occurred while fetching people." });
    }
  };

  const handleMovieSelect = async (movieId: string) => {
    setSelectedMovie(movieId);
    await fetchAssignedPeople(movieId);
  };

  const handleSubmit = async (values: z.infer<typeof personSchema>) => {
    if (!selectedMovie) {
      setMessage({ type: 'error', text: "Please select a movie first." });
      return;
    }

    try {
      const result = editingPerson
        ? await updatePerson(editingPerson.id, { ...values, movieId: selectedMovie })
        : await createPerson({ ...values, movieId: selectedMovie });

      if (result.success) {
        setMessage({ type: 'success', text: `Person ${editingPerson ? 'updated' : 'created'} successfully.` });
        form.reset();
        setEditingPerson(null);
        await fetchAssignedPeople(selectedMovie);
      } else {
        throw new Error(result.error || `Failed to ${editingPerson ? 'update' : 'create'} person.`);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : "An error occurred." });
    }
  };

  const handleDeletePerson = async (personId: string) => {
    if (selectedMovie && personId) {
      try {
        const result = await deletePerson(selectedMovie, personId);
        if (result.success) {
          setMessage({ type: 'success', text: "Person removed from movie successfully." });
          await fetchAssignedPeople(selectedMovie);
        } else {
          throw new Error(result.error || "Failed to remove person.");
        }
      } catch (error) {
        setMessage({ type: 'error', text: error instanceof Error ? error.message : "An error occurred while removing the person." });
      }
    }
  };

  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-600">No movies available. Please add some movies first.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">Manage Actors and Directors</h2>

      {message && (
        <div className={`mb-4 p-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded`}>
          {message.text}
        </div>
      )}

      <Select onValueChange={handleMovieSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a movie" />
        </SelectTrigger>
        <SelectContent>
          {movies.map((movie) => (
            <SelectItem key={movie.id} value={movie.id}>{movie.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedMovie && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Actor">Actor</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{editingPerson ? 'Update' : 'Add'} Person</Button>
          </form>
        </Form>
      )}

      {selectedMovie && assignedPeople.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned People</h3>
          <ul>
            {assignedPeople.map((person) => (
              <li key={person.id} className="flex justify-between items-center mb-2">
                <span>{person.name} ({person.role})</span>
                <div>
                  <Button variant="outline" className="mr-2" onClick={() => {
                    setEditingPerson(person);
                    form.reset({ name: person.name, role: person.role });
                  }}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeletePerson(person.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedMovie && assignedPeople.length === 0 && (
        <p className="mt-4 text-center text-gray-600">No people assigned to this movie yet.</p>
      )}
    </div>
  );
}