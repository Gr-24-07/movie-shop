'use server'

import { PrismaClient } from '@prisma/client'
import * as z from 'zod'

const prisma = new PrismaClient()

const personSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["Actor", "Director"]),
  movieId: z.string().uuid(),
})

export async function getPeople(movieId: string) {
  try {
    const actors = await prisma.job.findMany({
      where: { movieId, jobTitle: 'Actor' },
      include: { people: true },
    })
    const directors = await prisma.job.findMany({
      where: { movieId, jobTitle: 'Director' },
      include: { people: true },
    })
    const people = [
      ...actors.map(a => ({ id: a.people.id, name: a.people.name, role: 'Actor' as const })),
      ...directors.map(d => ({ id: d.people.id, name: d.people.name, role: 'Director' as const }))
    ]
    return { success: true, people }
  } catch (error) {
    console.error("Failed to fetch people:", error)
    return { success: false, error: "Failed to fetch people" }
  }
}

export async function createPerson(data: z.infer<typeof personSchema>) {
  try {
    const validatedData = personSchema.parse(data)
    const person = await prisma.people.create({
      data: { name: validatedData.name },
    })
    await prisma.job.create({
      data: {
        jobTitle: validatedData.role,
        movieId: validatedData.movieId,
        peopleId: person.id,
      },
    })
    return { success: true, person }
  } catch (error) {
    console.error("Failed to create person:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid data provided" }
    }
    return { success: false, error: "Failed to create person" }
  }
}

export async function updatePerson(personId: string, data: z.infer<typeof personSchema>) {
  try {
    const validatedData = personSchema.parse(data)
    const person = await prisma.people.update({
      where: { id: personId },
      data: { name: validatedData.name },
    })
    await prisma.job.updateMany({
      where: { peopleId: personId, movieId: validatedData.movieId },
      data: { jobTitle: validatedData.role },
    })
    return { success: true, person }
  } catch (error) {
    console.error("Failed to update person:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid data provided" }
    }
    return { success: false, error: "Failed to update person" }
  }
}

export async function deletePerson(movieId: string, personId: string) {
  try {
    await prisma.job.deleteMany({
      where: { movieId, peopleId: personId },
    })
    await prisma.people.delete({
      where: { id: personId },
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to delete person:", error)
    return { success: false, error: "Failed to delete person" }
  }
}