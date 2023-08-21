import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_CHARACTER_DETAIL = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      species
      status
      image
      gender
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;
export default function CharacterDetail() {
  const { characterId } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id: characterId },
  });
  function statusStyle() {
    if (data?.character?.status?.toLowerCase() === "alive") {
      return "text-green-700";
    }
    if (data?.character?.status?.toLowerCase() === "dead") {
      return "text-red-700";
    }
    return "text-white";
  }
  const errorContent = error && (
    <div className=" flex flex-col justify-center items-center">
      <span>Opps there is some problems </span>
      <span>{error.message}</span>
    </div>
  );
  const loadingContent = loading && (
    <h1 className="flex justify-center items-center text-4xl m-0">
      Loading.....
    </h1>
  );
  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <Link to={"/"}>
          <button className=" bg-slate-400 rounded p-1 m-2 hover:bg-slate-600">
            Back to Characters
          </button>
        </Link>
        {errorContent}
        {loadingContent}
        {!loading && !error && (
          <>
            <img src={data.character.image} alt={data.character.name} />
            <ul className="flex flex-col list-none justify-end items-center ">
              <li className={statusStyle() + " text-2xl"}>
                {data.character.status}
              </li>
              <li className=" text-xl">
                {data.character.name} : {data.character.gender}
              </li>
              <li className=" text-xl">Species : {data.character.species}</li>
              <li className=" text-xl">From : {data.character.origin.name}</li>
              <li className=" text-xl">
                Last seen in : {data.character.location.name}
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
