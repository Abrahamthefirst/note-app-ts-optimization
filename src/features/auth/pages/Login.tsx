import LoginForm from '../components/LoginForm';
import readingManImg from '../../../assets/images/reading-man.png';
const Login = () => {
  return (
    <main className="flex grid h-screen items-center bg-[#f8f8f8] md:grid-cols-2">
      <img src={readingManImg} alt="" />
      <div className="flex flex-col text-center">
        <h1 className="font-playfair text-black text-5xl my-6 tracking-wide">Login</h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
