
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import crud from '@/api/crudApi';

const { getResources, createResource, getResourceById } = crud;

export const useNotesQuery = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: () => {
      return getResources('notes');
    },
  });
};

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNoteData) => {
      return createResource('notes', newNoteData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
