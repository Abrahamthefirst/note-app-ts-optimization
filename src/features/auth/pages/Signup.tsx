import SignupForm from '../components/SignupForm';
import readingManImg from '../../../assets/images/reading-man.png';
const Signup = () => {
  return (
    <main className="flex grid h-screen items-center bg-[#f8f8f8] md:grid-cols-2">
      <img src={readingManImg} alt="" />
      <div className="flex flex-col text-center">
        <h1 className="font-playfair my-6 text-5xl tracking-wide text-black">
          Register
        </h1>
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
