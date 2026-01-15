const IPhoneFrame = ({ children }) => {
  return (
    <div className="relative mx-auto bg-[#9E9E9E] rounded-[2.5rem] p-2 shadow-2xl">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#9E9E9E] rounded-b-2xl z-10" />
      
      {/* Screen */}
      <div className="bg-white rounded-[2rem] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default IPhoneFrame;
