/* global beforeAll afterAll afterEach */
const db = require('../db');
const { runQuery } = require('../run');
const pokemonModules = require('../../src/api/pokemon/pokemon.modules');
const pokemonResolvers = require('../../src/api/pokemon/pokemon.resolvers');

// tests are executed using Jest :~)

describe('Project', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('pokemons', () => {
      test('should resolve correctly', async () => {
        await db.models.pokemon.create([
          {
            name: 'Test 1',
            img: 'http://img.pokemondb.net/artwork/caterpie.jpg',
          },
          {
            name: 'Test 2',
            img: 'http://img.pokemondb.net/artwork/caterpie.jpg',
          },
        ]);

        const results = await pokemonResolvers.Query.allPokemons(
          null,
          { input: {} },
          {
            models: {
              pokemon: db.models.pokemon,
            },
            modules: {
              pokemon: pokemonModules,
            },
          },
        );
        expect(results).toHaveLength(2);
      });

      test('should have correct query for all Pokemons', async () => {
        const expectedPokemons = await db.models.pokemon.create([
          {
            name: 'Test 1',
            img: 'http://img.pokemondb.net/artwork/caterpie.jpg',
          },
          {
            name: 'Test 2',
            img: 'http://img.pokemondb.net/artwork/caterpie.jpg',
          },
        ]);

        const query = `
          query AllPokemons {
            pokemons: allPokemons(limit: 2) {
              id
              name
            }
          }
        `;

        const results = await runQuery(query);
        expect(results.errors).toBeUndefined();
        expect(results.data.pokemons).toHaveLength(2);
        expect(expectedPokemons[0].name).toEqual(results.data.pokemons[0].name);
      });
    });
  });
});
