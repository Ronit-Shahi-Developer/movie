import React, { useState, useEffect } from "react";
import API from "../ApiService";
import { useCookies } from "react-cookie";

// ************************start***********************
const MovieForm = (props) => {
  // ******************************constants**********************
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token] = useCookies(["mr-token"]);

  useEffect(() => {
    setTitle(props.movie.title);
    setDescription(props.movie.description);
  }, [props.movie]); //whenever props .movie changes it takes action

  //   ************************functions********************

const isDisabled = title.length === 0 || description.length === 0;

  const updateClicked = () => {
    console.log("update here");
    API.updateMovie(props.movie.id, { title, description }, token["mr-token"])
      .then((resp) => props.updatedMovie(resp))
      .catch((error) => console.log(error));
  };

  const createClicked = () => {
    console.log("update here");
    API.createMovie({ title, description }, token["mr-token"])
      .then((resp) => props.newMovieCreated(resp))
      .catch((error) => console.log(error));
  };

  //   ****************************rendering******************
  return (
    <React.Fragment>
      {props.movie ? (
        <div>
          <label>Title</label>
          <br />
          {/* ***************************Title***************** */}

          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Description</label>
          <br />

          {/* **********************************description *************** */}
          <textarea
            value={description}
            id="description"
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          {/* ******************** button******************** */}
          {props.movie.id ? (
            <button onClick={updateClicked} disabled={isDisabled}> Update</button>
          ) : (
            <button onClick={createClicked} disabled={isDisabled}>Create</button>
          )}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MovieForm;
