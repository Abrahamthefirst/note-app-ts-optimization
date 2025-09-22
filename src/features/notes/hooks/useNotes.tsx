import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import crud from '@/api/crudApi';
import { successToast, errorToast } from '@/lib/toast';
import { useMemo } from 'react';
import type { CreateNoteInput } from '../schema/note.schema';

const { getResources, createResource, deleteResourceById } = crud;

export const useNotesByDirectory = (directoryId: string) => {
  return useQuery({
    queryKey: ['notes', directoryId],
    queryFn: () => {
      return getResources(`/directories/${directoryId}`);
    },

    enabled: !!directoryId,
  });
};

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async (): Promise<NoteApiResponse[]> => {
      return getResources<NoteApiResponse>('notes/me');
    },
    select: (data) => {
      return data.map((note) => ({
        ...note,
        tags: note.tags.map((tag) => tag.name),
      }));
    },
  });
};
export const useNotesInDirectory = (directoryId: string) => {
  const { data: allNotes, isLoading, isError } = useNotes();

  const filteredNotes = useMemo(() => {
    if (!allNotes || !directoryId) {
      return [];
    }

    return allNotes.filter((note) => note.directoryId === directoryId);
  }, [allNotes, directoryId]);

  return {
    data: filteredNotes,
    isLoading,
    isError,
  };
};

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNoteData: CreateNoteInput & { directoryId?: string }) => {
      return createResource('notes', newNoteData);
    },
    onSuccess: (response: any) => {
      successToast(`${response.data.title} Note created`);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: ApiError) => {
      console.log(error, 'Thsi si the note error');
      errorToast(error.response?.data?.message);
    },
  });
};

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: string) => {
      console.log("This is my note id", noteId)
      return deleteResourceById(`notes/me/${noteId}`);
    },
    onSuccess: () => {
      successToast(`Note Deleted`);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: ApiError) => {
      errorToast(error.response?.data?.message);
    },
  });
};
