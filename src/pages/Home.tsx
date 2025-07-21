import Header from '@/layout/Header';
import { Input } from '@/components/ui/input';
import CreatableSelect from 'react-select/creatable';
import { type MultiValue } from 'react-select';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { transformData } from '@/lib/utils';
import { NoteCard } from '@/components/Home/NoteCard';
type Note = {
  id: string;
  title: string;
  body: string;
  tagIds: string[];
};

interface Filters {
  title: string;
  tagIds: string[];
}
const Home = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>();

  const [filters, setFilters] = useState<Filters>({
    title: '',
    tagIds: [],
  });

  const [dbNotes] = useLocalStorage<Note[]>('notes', []);
  const [LSTags, setLSTags] = useLocalStorage<Tag[]>('tags', []);

  const [stateNotes, setStateNotes] = useState(dbNotes);

  const handleFilterByTitle = (value: string) => {
    if (Boolean(value)) {
      const filteredNotes = dbNotes.filter((note) => {
        return note.title.toLowerCase().includes(value.trim().toLowerCase());
      });

      setStateNotes(filteredNotes);
    } else {
      setStateNotes(dbNotes);
    }
    setTitle(value);
  };

  const handleFilterByTag = (
    tags: MultiValue<{ label: string; value: string }>
  ) => {
    if (tags.length != 0) {
      const filteredNotes = dbNotes.filter((note) => {
        const selectedTagIds = tags.map((tag) => tag.value);
        return note.tagIds.find((id) => selectedTagIds.includes(id));
      });
      setStateNotes(filteredNotes);
    } else {
      setStateNotes(dbNotes);
    }
  };

  return (
    <div>
      <Header />
      <main className="px-[clamp(.5rem,1rem+8vw,20rem)]">
        <div className="mx-8 flex justify-between gap-12">
          <Input
            value={title}
            onChange={(e) => handleFilterByTitle(e.target.value)}
          />
          <CreatableSelect
            isMulti
            className="w-1/2"
            onChange={(
              newValue: MultiValue<{ label: string; value: string }>
            ) => {
              handleFilterByTag(newValue);
              setTags(newValue.map((tag) => tag.label));
            }}
            options={transformData(LSTags)}
          />
        </div>

        <section className="grid gap-5 py-16 md:grid-cols-3">
          {stateNotes.map(({ title, body, tagIds, id }) => {
            return (
              <NoteCard
                title={title}
                body={body}
                tagIds={tagIds}
                id={id}
                key={id}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
