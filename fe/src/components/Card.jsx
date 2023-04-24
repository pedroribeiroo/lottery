function Card({ title, icon, color, children }) {
  return (
    <div className="w-[22.3rem] h-[11.5rem] bg-[#191B3D] rounded-lg font-bold">
      <div className="px-4 mt-[3.2rem]">
        <div className="flex items-center justify-start gap-[1rem]">
          <h1 className="text-[#A7AACD] text-[1.6rem]">{title}</h1>
          <img src={icon} alt="Icon" />
        </div>
        <div
          className={`${
            color === "red"
              ? "text-[#E11717] "
              : color === "green"
              ? "text-[#17E72C] "
              : color === "orange"
              ? "text-[#EA8E41] "
              : "text-white"
          }text-[2.4rem]`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
