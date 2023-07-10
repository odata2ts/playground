import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";

/**
 * Example for a model only existing on client side:
 * Represents the input values of the search form.
 */
export interface SearchForm {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
}

/**
 * Example of an enriched / computed version of the initial model:
 * we simply add some attributes.
 *
 * Create perfect view models with computed values.
 */
export interface EnrichedPersonModel extends Person {
  fullName: string;
}
