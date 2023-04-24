import { useState, useEffect } from "react";

function Ticket({ ticketId, onSelectNumbers, onValueNumbers }) {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [value, setValue] = useState(0);

  function selectNumber(number) {
    if (selectedNumbers.length < 20 && !selectedNumbers.includes(number)) {
      setSelectedNumbers([...selectedNumbers, number]);
      onSelectNumbers([...selectedNumbers, number]);
    }
  }

  function unselectNumber(number) {
    setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    onSelectNumbers(selectedNumbers.filter((n) => n !== number));
  }

  function isNumberSelected(number) {
    return selectedNumbers.includes(number);
  }

  useEffect(() => {
    const numberOfSelectedNumbers = selectedNumbers.length;
    if (numberOfSelectedNumbers === 15) {
      setValue(3);
      onValueNumbers(3);
    } else if (numberOfSelectedNumbers === 16) {
      setValue(100);
      onValueNumbers(100);
    } else if (numberOfSelectedNumbers === 17) {
      setValue(300);
      onValueNumbers(300);
    } else if (numberOfSelectedNumbers === 18) {
      setValue(5000);
      onValueNumbers(5000);
    } else if (numberOfSelectedNumbers === 19) {
      setValue(15000);
      onValueNumbers(15000);
    } else if (numberOfSelectedNumbers === 20) {
      setValue(20000);
      onValueNumbers(20000);
    } else {
      setValue(0);
      onValueNumbers(0);
    }
  }, [selectedNumbers]);

  useEffect(() => {
    onSelectNumbers(selectedNumbers);
  }, [selectedNumbers]);

  const numbers = Array(25)
    .fill()
    .map((_, i) => i + 1);

  return (
    <div className="flex flex-col items-start justify-start w-[24rem] h-[29rem] border-2 border-blue-500 rounded-md">
      <div className="flex justify-between w-full border-b border-dashed border-blue-500">
        <h1 className="text-[1.2rem] text-[#A7AACD] ml-[1.7rem] py-[1.2rem]">
          BILHETE #{ticketId + 1}
        </h1>
        <div className="flex items-center justify-center text-[1.2rem] mr-[2.4rem] gap-1">
          <h1 className="text-[#A7AACD]">Valor:</h1>
          <h1 className="text-[#17E72C]">
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h1>
        </div>
      </div>
      <h1 className="text-[1rem] text-[#A7AACD] py-[1rem] ml-4">
        Selecionados: {selectedNumbers.length}
      </h1>
      <div className="w-[22.2rem] h-[19rem] flex flex-wrap justify-center items-center gap-[0.8rem]">
        {numbers.map((number) => (
          <div
            key={number}
            className={`w-[3rem] h-[3rem] m-1 rounded-full flex justify-center items-center cursor-pointer
            ${
              isNumberSelected(number)
                ? "bg-[#EA8E41] text-white"
                : "bg-[#313051] text-white"
            }
            ${
              selectedNumbers.length >= 20 && !isNumberSelected(number)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
            onClick={() => {
              if (isNumberSelected(number)) {
                unselectNumber(number);
              } else {
                selectNumber(number);
              }
            }}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ticket;
