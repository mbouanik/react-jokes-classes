import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

const JokeList = ({ numJokesToGet }) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resetJokes, setResetJokes] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };
  /* retrieve jokes from API */
  useEffect(() => {
    const getJokes = async () => {
      let seenJokes = new Set();
      const res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" },
      });

      // console.log(res.data);
      if (!seenJokes.has(res.data.id)) {
        setJokes((jokes) => [...jokes, { ...res.data, votes: 0 }]);
        seenJokes.add(res.data.id);
      } else {
        console.log("duplicate found!");
      }
      // res.data.map((joke) => [...jokes, joke]);
    };
    console.log(jokes);
    let count = numJokesToGet;
    console.log(isLoading);
    try {
      while (count) {
        getJokes();
        count -= 1;
        console.log(jokes.length);
      }

      handleLoading();
      console.log(isLoading);
    } catch (err) {
      console.log(err);
    }
  }, [resetJokes]);

  // async getJokes() {
  //   try {
  //     // load jokes one at a time, adding not-yet-seen jokes
  //     let jokes = [];
  //     let seenJokes = new Set();
  //
  //     while (jokes.length < this.props.numJokesToGet) {
  //       let res = await axios.get("https://icanhazdadjoke.com", {
  //         headers: { Accept: "application/json" }
  //       });
  //       let { ...joke } = res.data;
  //
  //       if (!seenJokes.has(joke.id)) {
  //         seenJokes.add(joke.id);
  //         jokes.push({ ...joke, votes: 0 });
  //       } else {
  //         console.log("duplicate found!");
  //       }
  //     }
  //
  //     this.setState({ jokes, isLoading: false });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  /* empty joke list, set to loading state, and then call getJokes */

  const generateNewJokes = () => {
    setJokes([]);
    setIsLoading(true);
    setResetJokes((resetJokes) => !resetJokes);
  };

  /* change vote for this id by delta (+1 or -1) */

  const vote = (id, delta) => {
    setJokes((jokes) =>
      jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j)),
    );
  };

  /* render: either loading spinner or list of sorted jokes. */
  return (
    <>
      {console.log(!jokes.length)}
      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={generateNewJokes}>
            Get New Jokes
          </button>

          {jokes.map((j) => (
            <Joke
              text={j.joke}
              key={j.id}
              id={j.id}
              votes={j.votes}
              vote={vote}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default JokeList;
