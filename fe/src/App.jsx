import axios from "axios";

import { useEffect, useState, useContext } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Card from "./components/Card";

import { UserContext } from "./context/UserContext";

import ticketIcon from "./assets/ticket.svg";
import cashIcon from "./assets/cash.svg";
import upIcon from "./assets/up.svg";

function App() {
  const { user } = useContext(UserContext);

  const cards = [
    {
      title: "APOSTAS ATIVAS",
      icon: ticketIcon,
      color: "orange",
      value: "1 ATIVA",
    },
    {
      title: "SALDO",
      icon: cashIcon,
      color: "green",
      value: user?.balance
        ? user?.balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : "Carregando...",
    },
    {
      title: "LUCRO",
      icon: upIcon,
      color: "red",
      value: user?.profit
        ? user?.profit.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : "Carregando...",
    },
  ];

  if (user)
    return (
      <div className="w-screen h-screen">
        <Header user={user} />
        <div className="flex flex-col items-start justify-center ml-16 gap-[2.7rem]">
          <div className="flex flex-wrap gap-8">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                icon={card.icon}
                color={card.color}
              >
                {card.value}
              </Card>
            ))}
          </div>
          <Home />
        </div>
      </div>
    );
  else return null;
}

export default App;
