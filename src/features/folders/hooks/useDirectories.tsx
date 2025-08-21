import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '@/lib/toast';
import crud from '@/api/crudApi';
export const useDirectories = () => {
  return useQuery({
    queryKey: ['directory'],
    queryFn: () => crud.getResources('directories/me'),
  });
};

export const useDirectory = (directoryId: string) => {
  return useQuery({
    queryKey: ['directory', directoryId],
    queryFn: () => crud.getResourceById(directoryId),
  });
};

export const useCreateDirectory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createDirectoryRequestData: { name: string }) =>
      crud.createResource<DirectoriesApiResponse>(
        'directories',
        createDirectoryRequestData
      ),
    onSuccess: (response: any) => {
      successToast(`${response.data.name} Directory created`);
      queryClient.invalidateQueries({ queryKey: ['directory'] });
    },
    onError: (error: ApiError) => {
      errorToast(error.response?.data?.message);
    },
  });
};
