import CreateNoteForm from '../components/CreateNoteForm';
import FilterSearch from '@/components/FilterSearch';
import useFilterSearch from '@/hooks/useFilterSearch';

const NewNote = () => {

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <CreateNoteForm />

    </>
  );
};

export default NewNote;
