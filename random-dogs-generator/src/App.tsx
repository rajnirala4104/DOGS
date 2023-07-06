import React, { useEffect, useState } from "react";
import "./App.css";
import {
  getDogBreeds,
  getDogImageByBreedName,
  getSubBreedImageBreed,
} from "./api/services/FetchingData";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [onlyBreed, setOnlyBreed] = useState<string>("");
  const [subBreed, setSubBreed] = useState<string>("");
  const [dogFullName, setDogFullName] = useState<string[]>([]);
  const [_ALL_IMAGE, set_ALL_IMAGE] = useState<string[]>([]);

  const divideTheNameAndSet = (dogFullName: string) => {
    const dividedNames = dogFullName.split(" ");
    if (dividedNames.length === 2) {
      setSubBreed(dividedNames[0]);
      setOnlyBreed(dividedNames[1]);
      setDogFullName(dividedNames);
    } else {
      setOnlyBreed(dividedNames[0]);
      setDogFullName(dividedNames);
    }
  };

  useEffect(() => {
    (async () => {
      if (onlyBreed === "") {
        console.log("Oops!! we didn't get any breed name");
      } else {
        const response = await getDogImageByBreedName(onlyBreed);
        set_ALL_IMAGE(response.data.message);
      }
    })();
  }, [dogFullName]);

  useEffect(() => {
    (async () => {
      if (subBreed === "") {
        console.log("Oops!! we didn't get any breed and sub breed name ");
      } else {
        const response = await getSubBreedImageBreed(onlyBreed, subBreed);
        set_ALL_IMAGE(response.data.message);
      }
    })();
  }, [subBreed]);

  useEffect(() => {
    (async () => {
      const response = await getDogBreeds();
      const _ALL_BREEDS: string[] = [];
      const responseMessageData = response.data.message;
      Object.keys(responseMessageData).forEach((breed) => {
        if (responseMessageData[breed].length > 0) {
          for (let i = 0; i < responseMessageData[breed].length; i++) {
            _ALL_BREEDS.push(responseMessageData[breed][i] + " " + breed);
          }
        } else _ALL_BREEDS.push(breed);
      });
      setBreeds(_ALL_BREEDS);
    })();
  }, []);

  return (
    <div className="App min-h-[100vh]">
      <section className="containe border-2 top-0 bg-gray-200 flex flex-col my-auto">
        <h2>BREEDS LIST</h2>
        <div className="flex sticky top-0 justify-center items-center flex-col space-y-3 lg:flex-row bg-white py-2">
          <p>https://dog.ceo/api/breed/</p>
          <select
            className="py-2 px-4 mx-2 rounded"
            onChange={(e) => divideTheNameAndSet(e.target.value)}
          >
            <option value="">-- select --</option>
            {breeds.map((breed, i) => (
              <option key={i} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <p>/images/random</p>
          <button
            onClick={() => divideTheNameAndSet(onlyBreed)}
            className="bg-blue-400 px-4 hover:bg-blue-500 py-2 rounded-lg"
          >
            Fetch!
          </button>
        </div>
        <div className=" min-h-[20rem] flex flex-col justify-center items-center">
          {_ALL_IMAGE.map((imgLink, i) => (
            <img
              loading="lazy"
              src={imgLink}
              key={i}
              className="max-w-[30rem]"
              alt="dog"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
