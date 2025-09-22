import AnchorButton from '@/components/common/AnchorButton';
// import EditTag from '@/components/Home/EditTag';
// import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Header = () => {
  return (
    <header className="my-4 flex justify-between">
      <span>Notes</span>
      <div className="flex space-x-8">
        <AnchorButton to="new" className="bg-green-400">
          Create
        </AnchorButton>

        <Dialog>
          <DialogTrigger className="cursor-pointer rounded-md border-2 px-4 py-2">
            Edit Tags
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            {/* <EditTag /> */}
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
