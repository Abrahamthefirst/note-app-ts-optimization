import NoteIcon from './NoteIcon';
import DeleteFolder from '@/features/folders/components/DeleteFolder';
import { useParams } from 'react-router-dom';
import FilterSearch from '@/components/FilterSearch';
import useFilterSearch from '@/hooks/useFilterSearch';
import { useNotesInDirectory } from '../hooks/useNotes';
import { useDeleteNoteMutation } from '../hooks/useNotes';

const NoteList = () => {
  const { directoryId } = useParams();

  const { data, isLoading, isError } = useNotesInDirectory(directoryId!);

  const { mutate } = useDeleteNoteMutation();

  const { searchTerm, setSearchTerm, filteredResources } = useFilterSearch(
    data,
    ['title', { key: 'tags', isArray: true }]
  );
  const notes = filteredResources as unknown as NoteApiResponse[];

  if (isLoading) return <>Loading</>;
  if (isError) return <>Error</>;
  return (
    <section className="w-full bg-white">
      <section className="relative flex w-full p-8">
        {notes.map((note) => {
          return (
            <div className="relative gap-10" key={note.id}>
              <NoteIcon note={note} />
              <DeleteFolder deleteId={note.id} mutate={mutate} />
            </div>
          );
        })}
      </section>

      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchField="name"
        path={`/create-note/${directoryId}`}
      />
    </section>
  );
};

export default NoteList;
