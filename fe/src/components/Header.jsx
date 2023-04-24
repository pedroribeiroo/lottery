import logoutIcon from "../assets/logout.svg";
import buyIcon from "../assets/buy.svg";
import Logo from "../assets/logo.svg";
import userIcon from "../assets/user.svg";

function Header({ user }) {
  return (
    <header className="flex justify-between items-center p-8">
      <img src={Logo} alt="Buy" />
      <div className="flex items-center justify-center gap-2">
        <img src={userIcon} alt="User" />
        {user ? (
          <div className="flex flex-col items-start justify-center gap-1 text-[1.6rem] ml-[1rem]">
            <h1 className="text-[#0D67BD]">ID: 3478651</h1>
            <h1 className="text-[#17E72C]">
              {user.balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h1>
          </div>
        ) : null}
        <img className="ml-[1.5rem]" src={logoutIcon} alt="Logout" />
        <div className="w-[2px] h-[36px] bg-[#707293] mx-8" />
        <button className="flex items-center justify-center bg-[#2C3CCB] text-white w-[20.5rem] h-[4.7rem] text-[1.8rem] rounded-2xl gap-3">
          COMPRE TICKET <img src={buyIcon} alt="Buy" />
        </button>
      </div>
    </header>
  );
}

export default Header;
