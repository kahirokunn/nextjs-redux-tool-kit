import { NextPage } from "next";
import { pokemonApi, useGetPokemonByNameQuery } from "../services/pokemon";
import { wrapper, AppStore } from "../store";
import Link, { LinkProps } from "next/link";
import { useStore } from "react-redux";

const Pokemon: NextPage = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div>
      <h1>Pokemon</h1>
      <p>
        <a href="https://redux-toolkit.js.org/tutorials/rtk-query">
          see the tutorial
        </a>
      </p>
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </div>
    </div>
  );
};

type CustomPageLink<P = {}> = React.VFC<
  React.PropsWithChildren<
    Omit<LinkProps, "href"> & {
      aProps?: Omit<React.ComponentProps<"a">, "href">
    } & P
  >
>;


const loadPokemonPageData = async (store: AppStore) => {
  await store.dispatch(pokemonApi.endpoints.getPokemonByName.initiate("bulbasaur"))
}

export const PokemonPageLink: CustomPageLink = ({
  aProps = {},
  children,
  ...linkProps
}) => {
  const store = useStore();

  return (
    <Link {...linkProps} href="/pokemon">
      <a
        onMouseEnter={() =>
          aProps.target !== "_blank" && loadPokemonPageData(store)
        }
      >
        {children}
      </a>
    </Link>
  );
};

Pokemon.getInitialProps = wrapper.getInitialPageProps(
  (store) => async () => {
    await loadPokemonPageData(store)
    return {};
  }
);

export default Pokemon;
