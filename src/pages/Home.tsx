import Header from '@/layout/Header';
import { Input } from '@/components/ui/input';
import CreatableSelect from 'react-select/creatable';
import { type MultiValue } from 'react-select';
import { useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { transformData } from '@/lib/utils';
import { NoteCard } from '@/components/Home/NoteCard';
type Note = {
  id: string;
  title: string;
  body: string;
  tagIds: string[];
};

const Home = () => {
  const [filters, setFilters] = useState<Filters>({
    title: '',
    tagIds: [],
  });

  const [dbNotes] = useLocalStorage<Note[]>('notes', []);
  const [LSTags] = useLocalStorage<Tag[]>('tags', []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      title: e.target.value,
    }));
  };

  const handleTagChange = (
    selectedOptions: MultiValue<{ label: string; value: string }>
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tagIds: selectedOptions.map((option) => option.value),
    }));
  };

  const displayedNotes = useMemo(() => {
    let currentNotes = dbNotes;

    if (filters.title.trim() !== '') {
      const searchTitle = filters.title.trim().toLowerCase();
      currentNotes = currentNotes.filter((note) =>
        note.title.toLowerCase().includes(searchTitle)
      );
    }
    if (filters.tagIds.length > 0) {
      const selectedTagIdsSet = new Set(filters.tagIds);
      currentNotes = currentNotes.filter((note) =>
        note.tagIds.some((noteTagId) => selectedTagIdsSet.has(noteTagId))
      );
    }

    return currentNotes;
  }, [dbNotes, filters]);

  return (
    <div>
      <Header />
      <main className="px-[clamp(.5rem,1rem+8vw,20rem)]">
        <div className="mx-8 flex justify-between gap-12">
          <Input value={filters.title} onChange={handleTitleChange} />
          <CreatableSelect
            isMulti
            className="w-1/2"
            onChange={handleTagChange}
            options={transformData(LSTags)}
          />
        </div>
        <section className="grid gap-5 py-16 md:grid-cols-3">
          {displayedNotes.length > 0 ? (
            displayedNotes.map(({ title, body, tagIds, id }) => (
              <NoteCard
                title={title}
                body={body}
                tagIds={tagIds}
                id={id}
                key={id}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No notes found matching your filters.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
