import alertIcon from "../assets/alert.svg";

function Footer({ text }) {
  return (
    <footer className="mt-[3rem]">
      <div className="flex items-center justify-start ml-[2.5rem] text-[1rem] text-[#747495] gap-[0.5rem]">
        <img src={alertIcon} alt="Icon" />
        <h1>{text}</h1>
      </div>
    </footer>
  );
}

export default Footer;
