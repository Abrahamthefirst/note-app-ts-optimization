import { useDirectories } from '../folders/hooks/useDirectories';
import DirectoryTree from './DirectoryTree';
const GenericTree = () => {
  
  const { data, isPending, isError } = useDirectories();

  const directoriesResponseData = data as unknown as DirectoriesApiResponse;

  
  if (isPending) return 'loading';
  if (isError) return 'Error';

  return (
    <>
      {directoriesResponseData.map((directory) => {
        return <DirectoryTree directory={directory} key={directory.id} />;
      })}
    </>
  );
};

export default GenericTree;
