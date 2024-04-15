import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Country } from "../entities/country";
import { CountryInput } from "../inputs/Country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    try {
      return Country.find({});
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des pays :",
        error
      );
      throw error;
    }
  }

  // Ici c pour créer un nouveau pays
  @Mutation(() => Country)
  async createCountry(@Arg("data") data: CountryInput): Promise<Country> {
    try {
      const country = await Country.save({
        ...data,
      });

      return country;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création du pays :",
        error
      );
      throw error;
    }
  }

  @Query(() => [Country])
  async getCountryByCode(@Arg("code") code: string): Promise<Country[]> {
    try {
      const countries = await Country.find({
        where: {
          code,
        },
      });
      return countries;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des pays :",
        error
      );
      throw error;
    }
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[]> {
    try {
      const countries = await Country.find({
        where: {
          continent,
        },
      });
      return countries;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des pays :",
        error
      );
      throw error;
    }
  }
}
