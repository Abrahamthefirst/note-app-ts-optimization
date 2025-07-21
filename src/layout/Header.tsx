import AnchorButton from '@/components/common/AnchorButton';
import { useState } from 'react';
import { useRef } from 'react';
import EditTag from '@/components/Home/EditTag';
import { Button } from '@/components/ui/button';

const Header = () => {
  const createButtonClass = {
    'bg-green-400': true,
  };
  const dialogRef = useRef<HTMLDialogElement>(null);
  console.log(dialogRef)

  return (
    <header className="my-4 flex justify-between">
      <span>Notes</span>
      <div className="flex space-x-8">
        <AnchorButton to="new" className={createButtonClass}>
          Create
        </AnchorButton>

        <Button
          className="cursor-pointer"
          onClick={() => dialogRef.current?.showModal()}
        >
          Edit Tags
        </Button>

        <dialog className="backdrop:bg-amber-500 flex justify-center items-center w-" ref={dialogRef} >
          <EditTag closeModal={() => dialogRef.current?.close()} />
        </dialog>
      </div>
    </header>
  );
};

export default Header;
