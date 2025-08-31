import readingManImg from '../../../assets/images/reading-man.png';
import { Button } from '@/components/ui/button';
import { requestEmailVerificationLink } from '../api/auth';
import { errorToast, successToast } from '@/lib/toast';
import { useParams } from 'react-router-dom';
const RequestVerificationLink = () => {
  const { token } = useParams();

  const handleButtonClick = async () => {
    if (token) {
      const { data: successMsg, errMsg } =
        await requestEmailVerificationLink(token);
      if (errMsg) errorToast(errMsg);
      if (successMsg) successToast(successMsg);
    }
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-white">
      <img src={readingManImg} alt="" />
      <Button className={'bg-black text-white'} onClick={handleButtonClick}>
        Resend Verification Link
      </Button>
    </main>
  );
};

export default RequestVerificationLink;
