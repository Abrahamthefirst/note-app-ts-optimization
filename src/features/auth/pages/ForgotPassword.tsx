import readingManImg from '../../../assets/images/reading-man.png';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
   <main className="grid h-screen items-center bg-[#f8f8f8] md:grid-cols-2">
      <img src={readingManImg} alt="" />
      <div className="flex flex-col text-center">
        <h1 className="font-playfair text-black text-5xl my-6 tracking-wide">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </main>
  );
};

export default ForgotPassword;
