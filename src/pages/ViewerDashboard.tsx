import CreateDirectoryForm from '@/features/folders/components/CreateDirectoryForm';
import { useDirectories } from '@/features/folders/hooks/useDirectories';
import DirectoryImage from '@/features/folders/components/DirectoryImage';
import DeleteFolder from '@/features/folders/components/DeleteFolder';
import FilterSearch from '@/components/FilterSearch';
import useFilterSearch from '@/hooks/useFilterSearch';
import { useDeleteDirectory } from '@/features/folders/hooks/useDirectories';

const ViewerDashboard = () => {
  const { data, isPending, isError } = useDirectories();

  

  const { searchTerm, setSearchTerm, filteredResources } = useFilterSearch(
    data,
    'name'
  );
  const { mutate } = useDeleteDirectory();

  const directories = filteredResources as unknown as DirectoriesApiResponse;
  if (isPending) return <>Loading</>;
  if (isError) return <>Error</>;
  return (
    <section className="w-full bg-[#696969] h-full">
      <CreateDirectoryForm />
      <section className="grid w-full grid-cols-2 p-8 md:grid-cols-5">
        {directories.map((directoryData) => {
          return (
            <div className="relative flex gap-10" key={directoryData.id}>
              <DirectoryImage directoryData={directoryData} />
              <DeleteFolder deleteId={directoryData.id} mutate={mutate} />
            </div>
          );
        })}
      </section>
      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchField="name"
      />
    </section>
  );
};

export default ViewerDashboard;
