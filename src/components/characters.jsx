import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        name
        image
        id
      }
    }
  }
`;

export default function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  if (error)
    return (
      <h1 className=" flex flex-col justify-center text-4xl">
        Opps something went wrong :)
      </h1>
    );
  return (
    <>
      <nav className=" text-4xl flex justify-center bg-black  p-2">
        Rick and Morty's graph
      </nav>
      {loading && (
        <h1 className=" text-4xl mt-14 flex justify-center items-center">
          Loading......
        </h1>
      )}
      {!loading && (
        <div className=" grid grid-cols-4 gap-4 p-14 ">
          {data.characters.results.map(({ name, id, image }) => (
            <Link to={`/detail/${id}`} key={id}>
              <div className="relative hover:border-x-8 border-green-400 ">
                <img className=" " src={image} alt={image} />
                <span className=" text-xl absolute bottom-0 left-0 right-0 flex justify-center items-center bg-slate-950 w-fit p-1 ">
                  {name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
