import { useState, useContext } from "react";
import axios from "axios";

import Ticket from "./Ticket";
import Result from "./Result";
import Footer from "./Footer";

import { UserContext } from "../context/UserContext";

import ticketIcon from "../assets/ticket.svg";
import plusIcon from "../assets/plus.svg";

function Tab() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState([]);
  const { users } = useContext(UserContext);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddTicket = () => {
    const newTicket = {
      id: tickets.length + 1,
      value: 0,
      selectedNumbers: [],
    };
    setTickets([...tickets, newTicket]);
  };

  const handleSelectNumbers = (index, selectedNumbers) => {
    setTickets((prevState) => {
      const updatedTickets = [...prevState];
      updatedTickets[index].selectedNumbers = selectedNumbers;
      return updatedTickets;
    });
  };

  const handleValueNumbers = (index, value) => {
    setTickets((prevState) => {
      const updatedTickets = [...prevState];
      updatedTickets[index].value = value;
      return updatedTickets;
    });
  };

  const calculateTotalValue = () => {
    return tickets.reduce((total, ticket) => total + ticket.value, 0);
  };

  async function handleBuyTicket(data) {
    await axios
      .post("http://localhost:3001/ticket", data)
      .then((response) => {
        if (response.status === 200) {
          setTickets([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const updatedUser = await users();
  }

  return (
    <>
      <div className="mt-[1.8rem] border-b-2 border-[#212144]">
        <div className="flex ml-[2.6rem] gap-[3.0rem] text-[1.4rem] pb-[1.6rem]">
          <button
            className={`${
              activeTab === "tickets" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => handleTabClick("tickets")}
          >
            BILHETES
          </button>
          <button
            className={`${
              activeTab === "results" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => handleTabClick("results")}
          >
            RESULTADOS
          </button>
        </div>
      </div>
      {activeTab === "tickets" ? (
        <>
          <div className="mt-[3.6rem] ml-[2.6rem]">
            <div className="flex flex-wrap gap-[3.2rem]">
              {tickets.map((ticket, index) => (
                <Ticket
                  key={index}
                  ticketId={index}
                  onSelectNumbers={(selectedNumbers) =>
                    handleSelectNumbers(index, selectedNumbers)
                  }
                  onValueNumbers={(value) => handleValueNumbers(index, value)}
                />
              ))}
              <div
                className="w-[24rem] h-[29rem] border border-dashed border-[#EA8E41] cursor-pointer flex items-center justify-center"
                onClick={handleAddTicket}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <h1 className="text-[#DD8741]">ADICIONAR BILHETE</h1>
                    <img src={ticketIcon} alt="Ticket" />
                  </div>
                  <img src={plusIcon} alt="Plus" />
                </div>
              </div>
            </div>
            <h1 className="text-[#A7AACD] text-[1.2rem] mt-[1.2rem]">
              VALOR TOTAL:{" "}
              <span className="text-[#17E72C]">
                {calculateTotalValue().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <button
                className="w-[26rem] h-[6.5rem] bg-[#2C3CCB] rounded-2xl mt-[2.8rem]"
                onClick={() => handleBuyTicket(tickets)}
              >
                COMPRAR BILHETES
              </button>
            </div>
          </div>
          <Footer
            text="VALORES BILHETES: 15 NÚMEROS - R$ 3,00 | 16 NÚMEROS - R$ 100,00 | 17
          NÚMEROS - R$ 300,00 | 18 NÚMEROS - R$ 5.000,00 | 20 NÚMEROS - R$
          25.000,00"
          />
        </>
      ) : (
        <div>
          <Result />
          <Footer text="VALORES PRÊMIOS: 11 NÚMEROS - R$ 3,00 | 12 NÚMEROS - R$ 15,00 | 13 NÚMEROS - R$ 200,00 | 14 NÚMEROS - R$ 1.200,00 | 15 NÚMEROS - R$ 1.500.000,00" />
        </div>
      )}
    </>
  );
}

export default Tab;
