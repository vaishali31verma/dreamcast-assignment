const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{'background':'rgb(0 0 0 / 0.65)'}} className="overflow-y-auto bg-black/[0.65] opacity-[0.9] flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-ful">
      {children}
    </div>
  );
};
export default Modal;
