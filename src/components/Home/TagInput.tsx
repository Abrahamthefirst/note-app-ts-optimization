import React from 'react';
import { Input } from '@/components/ui/input';

interface TagItemProps {
  tag: Tag;
  onTagChange: (tagId: string, value: string) => void;
  onRemoveTag: (tagId: string) => void;
}
const TagInput = React.memo(
  ({ tag, onTagChange, onRemoveTag }: TagItemProps) => {
    return (
      <div className="mb-2 flex w-full items-center" key={tag.id}>
        <Input
          type="text"
          placeholder="Tag Label"
          value={tag.label}
          onChange={(e) => onTagChange(tag.id, e.target.value)}
        />
        <span
          onClick={() => onRemoveTag(tag.id)}
          className="mx-2 cursor-pointer rounded-md border bg-red-100 p-1 px-4 text-red-700"
        >
          X
        </span>
      </div>
    );
  }
);

export default TagInput;
