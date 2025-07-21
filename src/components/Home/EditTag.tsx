import { useLocalStorage } from '@/hooks/useLocalStorage';

type EditTagProps = {
  closeModal: () => void;
};
const EditTag = ({ closeModal }: EditTagProps) => {
  const [LSTags, setLSTags] = useLocalStorage<Tag[]>('tags', []);

  const renderTags = LSTags.map((tag) => {
    return <div className="my-1">{tag.label}</div>;
  });

  return (
    <div className="flex flex-col items-center justify-center bg-amber-300 rounded-md md:w-1/3">
      <div>
        <h3 className="text-white">Edit Tags</h3>
        <button onClick={closeModal} className='cursor-pointer'>X</button>
      </div>

      <hr />
      {renderTags}
    </div>
  );
};

export default EditTag;
