const Toast = ({
  message,
  icon,
  close,
  style,
}: {
  message: string;
  icon?: React.ReactNode;
  close: () => void;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={`relative cursor-pointer rounded-full border-2 border-white bg-black px-4 py-2 text-white shadow-lg transition-transform duration-700 ease-out`}
      onClick={close}
      style={style}
    >
      <div className="relative">
        <div className="flex items-center">
          {icon && <span className="text-2xl">{icon}</span>}
          <div>
            <p className="flex justify-center px-1 text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Toast