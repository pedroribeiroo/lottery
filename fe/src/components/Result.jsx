import axios from "axios";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "../context/UserContext";

import Ball from "./Ball";

function Result() {
  const [counter, setCounter] = useState();
  const [tickets, setTickets] = useState();
  const [numbers, setNumbers] = useState([]);
  const [numWinningTickets, setNumWinningTickets] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [sorted, setSorted] = useState(false);
  const { users } = useContext(UserContext);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/counter/giveawayId"),
      axios.get("http://localhost:3001/tickets"),
    ])
      .then(([counterResponse, ticketsResponse]) => {
        setCounter(counterResponse.data);
        setTickets(ticketsResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleSortClick() {
    await axios
      .get("http://localhost:3001/giveaway/")
      .then(async (response) => {
        const numbers = response.data;
        setNumbers(numbers);

        const highlightedNumbersCount = tickets.map((ticket) => {
          const ticketHighlightedNumbersCount = ticket.numbers.filter(
            (number) =>
              numbers &&
              numbers.drawnNumbers &&
              numbers.drawnNumbers.includes(number)
          ).length;
          return {
            ticketId: ticket.ticketId,
            highlightedNumbersCount: ticketHighlightedNumbersCount,
          };
        });
        const numWinningTickets = highlightedNumbersCount.filter(
          (ticket) => ticket.highlightedNumbersCount >= 11
        ).length;
        setNumWinningTickets(numWinningTickets);

        const totalPrize = highlightedNumbersCount.reduce((total, ticket) => {
          if (ticket.highlightedNumbersCount >= 11) {
            if (ticket.highlightedNumbersCount === 11) {
              return total + 3;
            } else if (ticket.highlightedNumbersCount === 12) {
              return total + 15;
            } else if (ticket.highlightedNumbersCount === 13) {
              return total + 200;
            } else if (ticket.highlightedNumbersCount === 14) {
              return total + 1200;
            } else if (ticket.highlightedNumbersCount === 15) {
              return total + 1500000;
            }
          }
          return total;
        }, 0);
        setTotalPrize(totalPrize);

        await axios
          .post("http://localhost:3001/prize", { totalPrize })
          .then((response) => {
            if (response.status === 200) {
            }
          })
          .catch((error) => {
            console.log(error);
          });

        const updatedUser = await users();

        setSorted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isNumberHighlighted(number) {
    return (
      numbers && numbers.drawnNumbers && numbers.drawnNumbers.includes(number)
    );
  }

  async function handlePrize(data) {}

  if (!counter || !counter.seq) {
    return <div>Carregando...</div>;
  }

  if (!tickets) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center mt-[2rem] ml-[2rem]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-[99.7rem] h-[13.6rem] border border-dashed border-[#EA8E41] text-[#EA8E41]">
          <h1>APOSTA #{counter.seq}</h1>
          <h1>NÚMEROS SORTEADOS:</h1>
          <div className="flex space-x-4 mt-[1rem]">
            {numbers &&
            numbers.drawnNumbers &&
            numbers.drawnNumbers.length > 0 ? (
              <div className="flex space-x-4 mt-[1rem]">
                {numbers.drawnNumbers
                  .sort((a, b) => a - b)
                  .map((number, index) => (
                    <Ball key={index} number={number} drawn={true} />
                  ))}
              </div>
            ) : (
              <div>Aguardando o sorteio ser realizado...</div>
            )}
          </div>
        </div>
        {sorted ? (
          <></>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <button
                className="w-[26rem] h-[6.5rem] bg-[#EA8E41] rounded-2xl mt-[3.2rem]"
                onClick={() => handleSortClick()}
              >
                SORTEAR APOSTAS
              </button>
            </div>
          </div>
        )}
        <table className="table-auto w-full mt-[2rem]">
          <thead>
            <tr className="text-[#707293] text-[1rem] uppercase border-b border-[#212144]">
              <th className="py-[1rem] px-[2.5rem] text-left">Aposta</th>
              <th className="py-[1rem] px-[2.5rem] text-left">Preço</th>
              <th className="py-[1rem] px-[2.5rem] text-left">Data</th>
              <th className="py-[1rem] px-[2.5rem] text-left">Selecionados</th>
            </tr>
          </thead>
          <tbody className="text-[#707293] text-[1rem]">
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b-2 border-black">
                <td className="py-[1rem] px-[2.5rem] text-left whitespace-nowrap">
                  #{counter.seq}-{ticket.ticketId.toString().padStart(4, "0")}
                </td>
                <td className="py-[1rem] px-[2.5rem] text-left text-[#17E72C]">
                  {ticket.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="py-[1rem] px-[2.5rem] text-left">
                  {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="py-[1rem] px-[2.5rem] text-left">
                  {ticket.numbers.length}
                </td>
                <td className="flex gap-4 py-[1rem]">
                  {" "}
                  {ticket.numbers
                    .sort((a, b) => a - b)
                    .map((number, index) => (
                      <Ball
                        key={index}
                        number={number}
                        active={isNumberHighlighted(number)}
                      />
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-[4rem] text-[#EA8E41] mt-[2rem]">
        <h1>BILHETES PREMIADOS: {numWinningTickets}</h1>
        <h1>TOTAL DO PRÊMIO: R${totalPrize.toFixed(2)}</h1>
      </div>
    </div>
  );
}

export default Result;
