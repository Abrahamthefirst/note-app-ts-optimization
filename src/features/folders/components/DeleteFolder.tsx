import { Trash2 } from 'lucide-react';

const DeleteFolder = ({ deleteId, mutate }: { deleteId: string; mutate: (id: string) => void }) => {
 
  return (
    <span className="absolute top-4 left-20 cursor-pointer bg-white text-black" onClick={() => mutate(deleteId)}>
      <Trash2 className="h-4 w-4" />
    </span>
  );
};

export default DeleteFolder;
