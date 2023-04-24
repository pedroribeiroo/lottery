import express, { json } from "express";
import "express-async-errors";
import "./database/index.js";
import Giveaway from "./database/schemas/Giveaway.js";
import Ticket from "./database/schemas/Ticket.js";
import Counter from "./database/schemas/Counter.js";
import User from "./database/schemas/User.js";

import cors from "./middlewares/cors.js";

const PORT = 3001;
const app = express();

app.use(cors);
app.use(json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const existingUser = await User.findOne({
  _id: "643b02fb307fce042922e794",
});

if (!existingUser) {
  const newUser = new User({
    _id: "643b02fb307fce042922e794",
    balance: 100000,
    profit: 0,
  });
  await newUser.save();
  console.log("Novo usuário criado com sucesso.");
}

app.get("/giveaway", async (req, res) => {
  try {
    const giveaway = await Giveaway.findOneAndUpdate(
      { finished: false },
      { finished: true },
      { new: true }
    ).exec();

    if (giveaway) {
      function generateRandomNumbers() {
        const sortedNumbers = [];
        while (sortedNumbers.length < 15) {
          const number = Math.floor(Math.random() * 25) + 1;
          if (!sortedNumbers.includes(number)) {
            sortedNumbers.push(number);
          }
        }
        return sortedNumbers;
      }

      async function getNextSequenceValue(sequenceName) {
        const counter = await Counter.findOneAndUpdate(
          { _id: sequenceName },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        ).exec();
        return counter.seq;
      }

      const giveaway = new Giveaway({
        activeTickets: 0,
        finished: false,
      });

      getNextSequenceValue("giveawayId").then((value) => {
        giveaway.giveawayId = value;
        return giveaway.save();
      });

      res.json({ drawnNumbers: generateRandomNumbers() });
    } else {
      res.json({ msg: "Sorteio já foi realizado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar os números sorteados." });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/counter/:id", async (req, res) => {
  try {
    const counter = await Counter.findById(req.params.id);
    if (!counter) {
      return res.status(404).json({ message: "Counter not found" });
    }
    res.json(counter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/ticket", async (req, res) => {
  const tickets = req.body;

  try {
    const userId = "643b02fb307fce042922e794";
    const promises = [];

    tickets.forEach((ticketData) => {
      const value = ticketData.value;

      const promise = User.findOne({ _id: userId })
        .then((user) => {
          if (user) {
            user.balance -= value;
            user.profit -= value;
            return user.save();
          }
        })
        .catch((err) => {
          console.error(err);
        });

      promises.push(promise);

      const ticket = new Ticket({
        ticketId: ticketData.id,
        numbers: ticketData.selectedNumbers,
        value: ticketData.value,
      });
      ticket.save();
    });

    await Promise.all(promises);

    return res.json({ msg: "Ticket salvo com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao salvar o ticket." });
  }
});

app.post("/prize", async (req, res) => {
  const prize = req.body.totalPrize;

  try {
    const userId = "643b02fb307fce042922e794";
    const value = prize;

    User.findOne({ _id: userId })
      .then((user) => {
        if (user) {
          user.balance += value;
          user.profit += value;
          return user.save();
        }
      })
      .then((updatedUser) => {})
      .catch((err) => {
        console.error(err);
      });

    await Ticket.deleteMany({});
    return res.json({ msg: "Prêmio atualizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao salvar o prêmio." });
  }
});
