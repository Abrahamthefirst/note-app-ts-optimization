// import useTags from '@/features/tag/useTag';
// import { Skeleton } from '../ui/skeleton';
// import TagInput from './TagInput';

// const EditTag = () => {
//   const {
//     error: tagError,
//     tags,
//     pending,
//     updateExistingTag,
//     deleteExistingTag,
//   } = useTags('fetchAll');

//   console.log(tagError, 'This is not flash');
//   const renderTags =
//     tags &&
//     Array.isArray(tags) &&
//     tags.map((tag) => {
//       return (
//         <div className="my-1 flex w-full items-center" key={tag.id}>
//           <TagInput
//             tag={tag}
//             onRemoveTag={deleteExistingTag}
//             onTagChange={updateExistingTag}
//           />
//         </div>
//       );
//     });

//   return (
//     <div className="rounded-md">
//       <h2 className="text-center text-2xl font-bold">Edit Tags</h2>
//       <div className="my-3 flex flex-col rounded-lg">
//         <div></div>

//         <hr className="mb-6" />
//         <div className="text-center text-red-400">{tagError && tagError}</div>

//         <div>{pending ? <SkeletonTags length={4} /> : renderTags}</div>
//       </div>
//     </div>
//   );
// };

// export default EditTag;

// const SkeletonTags = ({ length }: { length: number }) => {
//   const renderSkeletonTags = Array.from({ length }).map((_, index) => {
//     return (
//       <div className="flex gap-2" key={index}>
//         <Skeleton className="mb-2 h-10 w-full rounded-xl" />{' '}
//         <Skeleton className="mb-2 h-10 w-14 rounded-xl" />{' '}
//       </div>
//     );
//   });
//   return renderSkeletonTags;
// };
