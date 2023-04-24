function Ball({ number, active, drawn }) {
  const drawnColor = "bg-[#EA8E41]";
  const activeColor = "bg-[#35CAD0]";
  const defaultColor = "bg-[#313051]";

  return (
    <div
      className={`w-[3rem] h-[3rem] rounded-full text-white font-bold flex items-center justify-center ${
        active ? activeColor : drawn ? drawnColor : defaultColor
      }`}
    >
      {number}
    </div>
  );
}

export default Ball;
