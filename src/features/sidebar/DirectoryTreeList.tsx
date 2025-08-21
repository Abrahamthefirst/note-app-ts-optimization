import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { useDirectories } from '../folders/hooks/useDirectories';
import DirectoryTree from './DirectoryTree';
const GenericTree = () => {
  
  const { data, isPending, isError } = useDirectories();

  const directoriesResponseData = data as unknown as DirectoriesApiResponse;

  const items = [
    {
      title: 'Home',
      url: '#',
      icon: Home,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
    },
    {
      title: 'Calendar',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ];

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
