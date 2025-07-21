import AnchorButton from '@/components/common/AnchorButton';
import { useRef} from 'react';
import EditTag from '@/components/Home/EditTag';
import { Button } from '@/components/ui/button';

const Header = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <header className="my-4 flex justify-between">
      <span>Notes</span>
      <div className="flex space-x-8">
        <AnchorButton to="new" className="bg-green-400">
          Create
        </AnchorButton>

        <Button className="cursor-pointer" onClick={() => dialogRef.current?.showModal()}>
          Edit Tags
        </Button>

        <dialog className="backdrop:bg-amber-500" ref={dialogRef}>
          <EditTag closeModal={() =>  dialogRef.current?.close()} />
        </dialog>
      </div>
    </header>
  );
};

export default Header;
