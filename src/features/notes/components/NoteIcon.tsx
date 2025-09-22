
 import noteIcon from "../../../assets/images/writing-notes-icon-black-note-on-sheet-of-diary-with-pen-as-an-element-of-agreement-and-editing-file-vector.jpg"

const NoteIcon = ({
  note,
}: {
  note:NoteApiResponse;
}) => {
  return (
    <div className="flex max-w-30 flex-col items-center text-center">
      <img src={noteIcon} alt="" className="h-20 w-20" />
      <span className='text-black'>{note.title}</span>
    </div>
  );
};

export default NoteIcon;