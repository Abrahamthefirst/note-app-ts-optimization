import directoryImg from '../../../assets/images/folder-invoices.png';
import { Link } from 'react-router-dom';

const DirectoryImage = ({
  directoryData,
}: {
  directoryData: DirectoryApiResponse
}) => {
  return (
    <div className="flex max-w-30 flex-col items-center text-center">
      <img src={directoryImg} alt="" className="h-20 w-20" />
      <Link to={`directory/${directoryData.id}`} className='text-black'>{directoryData.name}</Link>
    </div>
  );
};

export default DirectoryImage;
