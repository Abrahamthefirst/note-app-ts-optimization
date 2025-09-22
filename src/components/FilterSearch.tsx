import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { SquarePen } from 'lucide-react';

const FilterSearch = ({
  searchTerm,
  setSearchTerm,
  searchField,
  path,
}: {
  searchTerm: string;
  searchField: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  path?: string;
}) => {
  return (
    <div className="fixed right-0 bottom-4 left-0 z-100 flex items-center">
      <div className="mx-auto flex items-center gap-4">
        <div className="flex w-64 items-center rounded-full border-2 border-black backdrop-blur-md focus-within:border-green-500">
          <Search className="mx-2 px-0 py-0" />
          <Input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchField}`}
            className="mx-0 rounded-full px-1 border-none bg-transparent px-1 text-black outline-none focus:border-none focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none"
          />
        </div>
        {path && (
          <Link className="inline" to={path}>
            <SquarePen />
          </Link>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;
