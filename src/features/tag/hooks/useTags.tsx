import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import crud from '@/api/crudApi';
import {type  CreateTagInput } from '../schema/tag.schema';

const { getResources, createResource, getResourceById } = crud;

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () =>  getResources('tags/me'),
    
  });
};

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTagData: CreateTagInput) => {
      return createResource('tag', newTagData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};
