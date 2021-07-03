import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

const MovieDetail = (props) => {
  const [token] = useCookies(["mr-token"]);

  let mov = props.movies;

  const [highlighted, setHighlighted] = useState(-1);

  const highlightRate = (high) => (evt) => {
    setHighlighted(high);
  };

  const rateClicked = (rate) => (eve) => {
    fetch(`${process.env.REACT_APP_API_URL}/${mov.id}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
      body: JSON.stringify({
        stars: rate + 1,
      }),
    })
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };

  const getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/${mov.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    })
      .then((resp) => resp.json()) //convert to json
      .then((resp) => props.updateMovie(resp))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {props.movies ? (
        <div>
          <h1> {props.movies.title}</h1>
          <p>{props.movies.description}</p>
          <FontAwesomeIcon
            icon={faStar}
            className={props.movies.avg_rating > 0 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movies.avg_rating > 1 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movies.avg_rating > 2 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movies.avg_rating > 3 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={props.movies.avg_rating > 4 ? "orange" : ""}
          />
          ({props.movies.no_of_ratings})
          <div className="rate-container">
            <h2>Rate it</h2>
            {[...Array(5)].map((e, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={highlighted > i - 1 ? "purple" : ""}
                  onMouseEnter={highlightRate(i)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={rateClicked(i)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MovieDetail;
