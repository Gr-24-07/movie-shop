"use client";

import { EditGenre } from '@/app/actions/genres';
import { Genre } from '@prisma/client';
import { useState } from 'react';

export function EditButton({ genre }: { genre: Genre }) {
    const [formData, setFormData] = useState({
        name: genre.name,
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = async () => {
        if (isEditing) {
            
            await EditGenre(genre.id, { name: formData.name });
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    return isEditing ? (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 rounded-md px-2 py-1"
            />
            <button
                className="h-7 w-10 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-800"
                onClick={handleEdit}
            >
                Save
            </button>
        </div>
    ) : (
        <button
            className="h-7 w-10 bg-green-500 text-white font-bold rounded-lg hover:bg-green-800"
            onClick={handleEdit}
        >
            Edit
        </button>
    );
}
